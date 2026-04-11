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

        await supabase
            .from("profiles")
            .update({
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
            })
            .eq("id", user.id);
    }
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

/** Salva uma missão concluída na tabela completed_missions */
export async function saveCompletedMission(missionData) {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) throw new Error("Not authenticated");

    const payload = {
        user_id: user.id,
        case_id: missionData.caseId,
        titulo: missionData.titulo || "",
        dificuldade: missionData.dificuldade || "",
        resultado: missionData.resultado || "WON",
        xp_ganho: missionData.xpGanho || 0,
        recompensa_ganha: missionData.recompensaGanha || 0,
        suspect_captured: missionData.suspectCaptured || null,
    };

    const { error } = await supabase
        .from("completed_missions")
        .insert(payload);

    if (error) {
        console.warn("[gameSaveService] Erro ao salvar missão concluída:", error.message);
        throw error;
    }

    console.log(`[gameSaveService] Missão ${missionData.caseId} salva com sucesso.`);
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