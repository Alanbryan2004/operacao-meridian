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

export const REWARDS = {
    DAY_7: {
        type: "ATLAS_40",
        label: "Voucher Atlas Aéreo (40%)",
        credits: 30,
        discount: 0.40
    },
    DAY_14: {
        type: "ATLAS_50",
        label: "Voucher Atlas Aéreo (50%)",
        credits: 50,
        discount: 0.50
    },
    DAY_30: {
        type: "ATLAS_EXECUTIVE",
        label: "Passe Executivo Atlas",
        credits: 100,
        discount: 0.60, // Bônus maior
        hasInstantTravel: true
    }
};

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
        await saveStreakData(initial);
        return { ...initial, newlyAwarded: null };
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
        // Sequência quebrada
        updated.current_streak = 1;
    }

    updated.last_completion_date = todayStr;
    if (updated.current_streak > updated.highest_streak) {
        updated.highest_streak = updated.current_streak;
    }

    // Checar recompensas
    let streakReached = updated.current_streak; // Armazena o valor atingido para o feedback visual
    
    // 🔥 Corrigido: Usar >= 30 para evitar usuários "presos" em sequências altas
    if (updated.current_streak >= 30) {
        newlyAwarded = REWARDS.DAY_30;
    } else if (updated.current_streak >= 14) {
        newlyAwarded = REWARDS.DAY_14;
    } else if (updated.current_streak >= 7) {
        newlyAwarded = REWARDS.DAY_7;
    }
 
    if (newlyAwarded) {
        updated.vouchers = [...(updated.vouchers || []), { ...newlyAwarded, id: Date.now() }];
        // Ao atingir um marco de recompensa, resetamos a sequência no banco de dados
        console.log(`[streakService] Recompensa concedida (${newlyAwarded.label}). Resetando streak no banco.`);
        updated.current_streak = 0; 
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
