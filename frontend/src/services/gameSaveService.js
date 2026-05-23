import { supabase } from "../lib/supabase";

/** Garante que existe um profile para o usuário logado */
export async function ensureProfile(nickname = "") {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) throw new Error("Not authenticated");

    const { data: existing, error: selErr } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

    if (selErr) throw selErr;
    if (existing) return;

    const { error } = await supabase.from("profiles").insert({
        id: user.id,
        nickname,
        rank: "Novato",
        xp: 0,
        level: 1,
    });

    if (error) throw error;
}

/** Salva o state do jogo (slot 0 por padrão) */
export async function saveGameState(state, slot = 0) {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) throw new Error("Not authenticated");

    const payload = {
        user_id: user.id,
        slot,
        state,
        version: 1,
    };

    const { error } = await supabase
        .from("game_saves")
        .upsert(payload, { onConflict: "user_id,slot" });

    if (error) throw error;

    // 🔥 Sincroniza campos importantes com o 'profiles' para Ranking/Exibição
    const { player, capturedSuspects } = state;
    if (player) {
        const totalCapturas = Object.values(capturedSuspects || {}).reduce((acc, val) => acc + val, 0);

        const profilePayload = {
            nickname: player.nome || "Agente",
            avatar_key: player.avatarUrl || null,
            rank: player.nivelTitulo || "Novato",
            xp: player.xp || 0,
            level: player.nivel || 1,
            total_capturas: totalCapturas,
            hard_wins: player.hardWins || 0,
            hard_losses: player.hardLosses || 0,
            legendary_wins: player.legendaryWins || 0,
            legendary_losses: player.legendaryLosses || 0,
            avatar: player.avatar, // Salva o objeto completo {gender, id, frase}
            frase: player.avatar?.frase || "",
            updated_at: new Date().toISOString(),
        };

        console.log("[gameSaveService] Sincronizando profile com payload:", profilePayload);

        const { error: profErr } = await supabase
            .from("profiles")
            .update(profilePayload)
            .eq("id", user.id);

        if (profErr) {
            console.error("[gameSaveService] Erro ao sincronizar profile:", profErr.message);
        } else {
            console.log("[gameSaveService] Profile sincronizado com sucesso.");
        }
    }
}

/** Carrega os dados de streak do jogador */
export async function loadUserStreak() {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return null;

    const { data, error } = await supabase
        .from("daily_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) return null;
    return data;
}

/** Carrega o state do jogo (slot 0 por padrão) */
export async function loadGameState(slot = 0) {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) return null;

    const { data, error } = await supabase
        .from("game_saves")
        .select("state, version, updated_at")
        .eq("user_id", user.id)
        .eq("slot", slot)
        .maybeSingle();

    if (error) throw error;
    return data?.state ?? null;
}

/** Salva uma missão concluída na tabela completed_missions.
 *  Usa lógica de deduplicação: se já existe um registro para o mesmo case_id,
 *  atualiza apenas se o novo resultado for melhor (WON > LOST).
 */
export async function saveCompletedMission(missionData) {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) throw new Error("Not authenticated");

    const newResult = missionData.resultado || "WON";

    // 1. Sempre insere o novo registro para garantir persistência 
    // (Útil se houver restrições de UPDATE em tabelas de log/histórico)
    const { error: insErr } = await supabase
        .from("completed_missions")
        .insert({
            user_id: user.id,
            case_id: missionData.caseId,
            titulo: missionData.titulo || "",
            dificuldade: missionData.dificuldade || "",
            resultado: newResult,
            xp_ganho: missionData.xpGanho || 0,
            recompensa_ganha: missionData.recompensaGanha || 0,
            suspect_captured: missionData.suspectCaptured || null,
            completed_at: new Date().toISOString(),
        });

    if (insErr) {
        console.warn("[gameSaveService] Erro ao inserir nova missão:", insErr.message);
        throw insErr;
    }

    console.log(`[gameSaveService] Missão ${missionData.caseId} registrada como ${newResult}.`);

    // 2. Aciona limpeza de duplicatas para manter o banco limpo
    // Isso remove registros 'LOST' se agora temos um 'WON', etc.
    try {
        await cleanupDuplicateMissions();
    } catch (cleanErr) {
        console.warn("[gameSaveService] Falha na limpeza de duplicatas (não-crítico):", cleanErr.message);
    }
}

/** Carrega todas as missões concluídas do jogador */
export async function loadCompletedMissions() {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) return [];

    const { data, error } = await supabase
        .from("completed_missions")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

    if (error) {
        console.warn("[gameSaveService] Erro ao carregar missões:", error.message);
        return [];
    }

    return data || [];
}

/** Remove registros duplicados do banco, mantendo o melhor resultado por case_id */
export async function cleanupDuplicateMissions() {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return;

    const { data, error } = await supabase
        .from("completed_missions")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

    if (error || !data) return;

    // Agrupa por case_id, decidindo qual manter
    const bestByCase = {};
    const toDelete = [];

    for (const m of data) {
        const key = m.case_id;
        if (!bestByCase[key]) {
            bestByCase[key] = m;
        } else {
            const existing = bestByCase[key];
            // WON ganha sobre LOST
            if (m.resultado === "WON" && existing.resultado !== "WON") {
                toDelete.push(existing.id);
                bestByCase[key] = m;
            } else {
                toDelete.push(m.id);
            }
        }
    }

    if (toDelete.length > 0) {
        console.log(`[gameSaveService] Removendo ${toDelete.length} registros duplicados.`);
        await supabase
            .from("completed_missions")
            .delete()
            .in("id", toDelete);
    }
}