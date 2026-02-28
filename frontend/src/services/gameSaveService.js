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