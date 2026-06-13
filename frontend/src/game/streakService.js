import { supabase } from "../lib/supabase";

/**
 * Lógica de Sequência Diária (Streaks) e Recompensas (Vouchers)
 */

function getLocalTodayStr() {
    const now = new Date();
    // Retorna YYYY-MM-DD em fuso local
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

import { inventoryService } from "./inventoryService";

export const STREAK_REWARDS_30_DAYS = [
    { day: 1, items: { satelite_atlas: 1 }, moedas: 0, label: "Satélite A.T.L.A.S" },
    { day: 2, items: { fonte_anonima: 1 }, moedas: 0, label: "Fonte Anônima" },
    { day: 3, items: { dossie_sigiloso: 1 }, moedas: 0, label: "Dossiê Sigiloso" },
    { day: 4, items: { licenca_tatica: 1 }, moedas: 0, label: "Licença Tática" },
    { day: 5, items: {}, moedas: 10000, label: "10.000 Moedas" },
    { day: 6, items: { satelite_atlas: 1 }, moedas: 5000, label: "5.000 + Satélite" },
    { day: 7, items: { fonte_anonima: 1 }, moedas: 5000, label: "5.000 + Fonte Anônima" },
    { day: 8, items: { dossie_sigiloso: 1 }, moedas: 5000, label: "5.000 + Dossiê" },
    { day: 9, items: { licenca_tatica: 1 }, moedas: 5000, label: "5.000 + Licença" },
    { day: 10, items: {}, moedas: 15000, label: "15.000 Moedas" },
    { day: 11, items: { satelite_atlas: 1, fonte_anonima: 1 }, moedas: 0, label: "Satélite + Fonte" },
    { day: 12, items: { dossie_sigiloso: 1, licenca_tatica: 1 }, moedas: 0, label: "Dossiê + Licença" },
    { day: 13, items: { satelite_atlas: 1 }, moedas: 10000, label: "10.000 + Satélite" },
    { day: 14, items: { fonte_anonima: 1 }, moedas: 10000, label: "10.000 + Fonte" },
    { day: 15, items: {}, moedas: 20000, label: "20.000 Moedas" },
    { day: 16, items: { dossie_sigiloso: 2 }, moedas: 5000, label: "5.000 + 2x Dossiê" },
    { day: 17, items: { licenca_tatica: 2 }, moedas: 5000, label: "5.000 + 2x Licença" },
    { day: 18, items: { satelite_atlas: 2 }, moedas: 5000, label: "5.000 + 2x Satélite" },
    { day: 19, items: { fonte_anonima: 2 }, moedas: 5000, label: "5.000 + 2x Fonte" },
    { day: 20, items: {}, moedas: 25000, label: "25.000 Moedas" },
    { day: 21, items: { satelite_atlas: 1, dossie_sigiloso: 1 }, moedas: 10000, label: "10.000 + Equipamentos" },
    { day: 22, items: { fonte_anonima: 1, licenca_tatica: 1 }, moedas: 10000, label: "10.000 + Contatos" },
    { day: 23, items: { satelite_atlas: 1, licenca_tatica: 1 }, moedas: 15000, label: "15.000 + Operacional" },
    { day: 24, items: { fonte_anonima: 1, dossie_sigiloso: 1 }, moedas: 15000, label: "15.000 + Inteligência" },
    { day: 25, items: {}, moedas: 30000, label: "30.000 Moedas" },
    { day: 26, items: { satelite_atlas: 2, dossie_sigiloso: 1 }, moedas: 10000, label: "10.000 + Kit Tático" },
    { day: 27, items: { fonte_anonima: 2, licenca_tatica: 1 }, moedas: 10000, label: "10.000 + Kit Fuga" },
    { day: 28, items: { satelite_atlas: 2, licenca_tatica: 2 }, moedas: 15000, label: "15.000 + Arsenal" },
    { day: 29, items: { dossie_sigiloso: 2, fonte_anonima: 2 }, moedas: 15000, label: "15.000 + Informante" },
    { day: 30, items: { satelite_atlas: 1, fonte_anonima: 1, dossie_sigiloso: 1, licenca_tatica: 1 }, moedas: 50000, label: "Pacote A.T.L.A.S. Completo" }
];

/**
 * Busca o streak atual do banco
 */
export async function getStreakData(userId) {
    const { data, error } = await supabase
        .from("daily_streaks")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.error("[streakService] Erro ao carregar streak:", error.message);
        return null;
    }
    return data;
}

/**
 * Atualiza o streak após completar uma missão com sucesso.
 */
export async function updateStreakOnWin(userId) {
    const now = new Date();
    const todayStr = getLocalTodayStr();
    
    const existing = await getStreakData(userId);
    
    if (!existing) {
        // Primeiro streak do usuário
        const initial = {
            user_id: userId,
            current_streak: 1,
            last_completion_date: todayStr,
            highest_streak: 1,
            vouchers: []
        };
        
        const newlyAwarded = STREAK_REWARDS_30_DAYS.find(r => r.day === 1);

        if (newlyAwarded) {
            try {
                const { inventoryService } = await import("./inventoryService");
                if (newlyAwarded.items) {
                    for (const [key, qty] of Object.entries(newlyAwarded.items)) {
                        await inventoryService.addItem(userId, key, qty);
                    }
                }
            } catch (e) {
                console.error("[streakService] Erro ao creditar itens do dia 1:", e);
            }
        }

        await saveStreakData(initial);
        return { ...initial, newlyAwarded, streakReached: 1 };
    }

    const lastDateParts = existing.last_completion_date.split("-");
    const lastDate = new Date(lastDateParts[0], lastDateParts[1] - 1, lastDateParts[2]);
    lastDate.setHours(0,0,0,0);

    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    todayDate.setHours(0,0,0,0);

    const diffMs = todayDate - lastDate;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    let updated = { ...existing };
    let newlyAwarded = null;

    if (diffDays === 0) {
        // Já completou hoje. Mas e se for uma "missão fantasma" do bug de UTC?
        // Vamos checar no banco se existem duas missões diferentes concluídas hoje no fuso local.
        const { data: missions } = await supabase
            .from("completed_missions")
            .select("case_id, completed_at")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(10);
        
        const missionsFromToday = (missions || []).filter(m => {
            const mDate = new Date(m.completed_at);
            // Verifica se a missão aconteceu nas últimas 24h
            if ((now - mDate) > (24 * 60 * 60 * 1000)) return false;
            
            // Janela "Fantasma" (UTC-3):
            // Missões entre 00:00 e 03:00 UTC são na verdade do dia anterior no horário local do Brasil.
            // Se encontrarmos uma missão nessa janela + uma missão agora, é uma sequência real de 2 dias.
            const isLateNightGhost = mDate.getUTCHours() < 3;
            return isLateNightGhost;
        });

        if (missionsFromToday.length >= 1 && updated.current_streak === 1) {
            console.log("[streakService] Recuperação de streak detectada (Missão Fantasma corrigida).");
            updated.current_streak = 2;
        } else {
            console.log("[streakService] Missão do dia já contabilizada.");
            return null;
        }
    } else if (diffDays === 1) {
        // Sequência mantida
        updated.current_streak += 1;
    } else {
        // diffDays > 1: Sequência potencialmente quebrada
        // 🔥 VERIFICA LICENÇA TÁTICA antes de resetar!
        const diasPerdidos = diffDays - 1;
        let licencasUsadas = false;

        try {
            const { data: inv } = await supabase
                .from("user_inventory")
                .select("licenca_tatica")
                .eq("user_id", userId)
                .maybeSingle();
            
            const licencas = inv?.licenca_tatica || 0;

            if (licencas >= diasPerdidos) {
                console.log(`[streakService] updateStreakOnWin: ${diasPerdidos} Licença(s) Tática(s) consumida(s)! Salvando ofensiva.`);
                
                // Consome as licenças necessárias
                await supabase
                    .from("user_inventory")
                    .update({ licenca_tatica: licencas - diasPerdidos })
                    .eq("user_id", userId);
                
                // Streak continua normalmente (+1 pelo dia de hoje)
                updated.current_streak += 1;
                licencasUsadas = true;
            }
        } catch (err) {
            console.error("[streakService] Erro ao verificar licenças em updateStreakOnWin:", err);
        }

        if (!licencasUsadas) {
            // Sem licenças suficientes — sequência quebrada
            updated.current_streak = 1;
        }
    }

    updated.last_completion_date = todayStr;
    if (updated.current_streak > updated.highest_streak) {
        updated.highest_streak = updated.current_streak;
    }

    // Checar recompensas na Trilha de 30 Dias
    let streakReached = updated.current_streak; // Armazena o valor atingido para o feedback visual
    
    // Calcula o dia de recompensa. Se passar de 30, reinicia a trilha (31 = dia 1, etc)
    const normalizedDay = ((streakReached - 1) % 30) + 1;
    newlyAwarded = STREAK_REWARDS_30_DAYS.find(r => r.day === normalizedDay);
 
    if (newlyAwarded) {
        // Se houver itens para conceder, adiciona ao banco
        if (newlyAwarded.items && Object.keys(newlyAwarded.items).length > 0) {
            try {
                for (const [key, qty] of Object.entries(newlyAwarded.items)) {
                    await inventoryService.addItem(userId, key, qty);
                }
                console.log(`[streakService] Itens concedidos para o dia ${normalizedDay}:`, newlyAwarded.items);
            } catch (e) {
                console.error("[streakService] Erro ao creditar itens do streak:", e);
            }
        }
        if (normalizedDay === 30) {
            console.log(`[streakService] Pacote de 30 dias alcançado! Resetando ciclo da trilha.`);
            updated.current_streak = 0; 
        }
    }

    await saveStreakData(updated);
    // Retornamos o objeto com o current_streak já resetado para o estado do jogo,
    // mas incluímos o streakReached para que a interface de Recompensa mostre o valor que disparou o prêmio.
    return { ...updated, streakReached, newlyAwarded };
}

/**
 * Salva os dados no Supabase
 */
async function saveStreakData(data) {
    const { error } = await supabase
        .from("daily_streaks")
        .upsert(data);
    
    if (error) console.error("[streakService] Erro ao salvar streak:", error.message);
}

/**
 * Verifica se o streak foi perdido no login
 */
export async function checkStreakPersistence(userId) {
    const data = await getStreakData(userId);
    if (!data || !data.last_completion_date) return null;

    const now = new Date();
    const lastDateParts = data.last_completion_date.split("-");
    const lastDate = new Date(lastDateParts[0], lastDateParts[1] - 1, lastDateParts[2]);
    lastDate.setHours(0,0,0,0);

    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    todayDate.setHours(0,0,0,0);

    const diffMs = todayDate - lastDate;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Verifica se o usuário tem Licença Tática no inventário
        const { data: inv } = await supabase.from("user_inventory").select("licenca_tatica").eq("user_id", userId).maybeSingle();
        const licencas = inv?.licenca_tatica || 0;
        const diasPerdidos = diffDays - 1;

        if (licencas >= diasPerdidos) {
            console.log(`[streakService] ${diasPerdidos} Licença(s) Tática(s) consumida(s)! Salvando ofensiva do agente.`);
            
            // Consome as licenças necessárias
            await supabase.from("user_inventory").update({ licenca_tatica: licencas - diasPerdidos }).eq("user_id", userId);
            
            // Calcula quais dias foram protegidos
            const diasProtegidos = [];
            for (let i = 1; i <= diasPerdidos; i++) {
                const protectedDate = new Date(lastDate);
                protectedDate.setDate(protectedDate.getDate() + i);
                const py = protectedDate.getFullYear();
                const pm = String(protectedDate.getMonth() + 1).padStart(2, "0");
                const pd = String(protectedDate.getDate()).padStart(2, "0");
                diasProtegidos.push(`${py}-${pm}-${pd}`);
            }

            // 🔥 Salva notificação pendente para o modal visual
            try {
                localStorage.setItem("pendingLicencaNotification", JSON.stringify({
                    diasProtegidos,
                    licencasConsumidas: diasPerdidos,
                    licencasRestantes: licencas - diasPerdidos,
                    streakAtual: data.current_streak,
                    dataUltimaJogada: data.last_completion_date
                }));
            } catch (e) { /* localStorage cheio, ignora */ }

            // "Finge" que a última missão concluída foi ontem, para que hoje seja o diffDays === 1
            const yesterdayDate = new Date(todayDate);
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            
            const y = yesterdayDate.getFullYear();
            const m = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
            const d = String(yesterdayDate.getDate()).padStart(2, "0");
            const yesterdayStr = `${y}-${m}-${d}`;

            const savedData = { ...data, last_completion_date: yesterdayStr, licenca_usada: true };
            await saveStreakData(savedData);
            return savedData;
        }

        // Perdeu o streak por inatividade e não tinha licenças suficientes
        const resetData = { ...data, current_streak: 0 };
        await saveStreakData(resetData);
        return resetData;
    }

    // 🔥 Se o usuário já chegou em 30 ou mais e já é um novo dia, 
    // reseta para que ele possa começar a nova trilha de 7/14/30 dias.
    if (data.current_streak >= 30 && diffDays === 1) {
        console.log("[streakService] Ciclo de 30 dias completo. Reiniciando contador.");
        const resetData = { ...data, current_streak: 0 };
        await saveStreakData(resetData);
        return resetData;
    }

    return data;
}
