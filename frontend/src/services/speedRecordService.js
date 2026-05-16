import { supabase } from "../lib/supabase";

/**
 * Submete um recorde de velocidade para um caso.
 * Usa upsert — se o jogador já tem um recorde para este caso,
 * só atualiza se o novo tempo for MENOR.
 * 
 * Retorna { isNewRecord: boolean, previousBest: number|null, globalRank: number|null }
 */
export async function submitSpeedRecord(caseId, durationSeconds, playerData = {}) {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
        console.warn("[SpeedRecord] Usuário não autenticado.");
        return { isNewRecord: false };
    }

    // 1. Busca recorde anterior do jogador para este caso
    const { data: existing } = await supabase
        .from("speed_records")
        .select("id, duration_seconds")
        .eq("user_id", user.id)
        .eq("case_id", caseId)
        .maybeSingle();

    const previousBest = existing?.duration_seconds ?? null;

    // Se já tem um recorde melhor, não atualiza
    if (previousBest !== null && previousBest <= durationSeconds) {
        console.log(`[SpeedRecord] Tempo atual (${durationSeconds}s) não superou o recorde pessoal (${previousBest}s).`);
        return { isNewRecord: false, previousBest, globalRank: null };
    }

    // 2. Upsert do recorde
    const payload = {
        user_id: user.id,
        case_id: caseId,
        duration_seconds: durationSeconds,
        nickname: playerData.nickname || "Agente",
        rank: playerData.rank || "Novato",
        avatar: playerData.avatar || null,
        avatar_key: playerData.avatarKey || null,
    };

    const { error: upsertErr } = await supabase
        .from("speed_records")
        .upsert(payload, { onConflict: "user_id,case_id" });

    if (upsertErr) {
        console.error("[SpeedRecord] Erro ao salvar recorde:", upsertErr.message);
        return { isNewRecord: false, previousBest };
    }

    // 3. Busca posição global do jogador neste caso
    const { data: allRecords } = await supabase
        .from("speed_records")
        .select("user_id")
        .eq("case_id", caseId)
        .order("duration_seconds", { ascending: true });

    const globalRank = allRecords
        ? allRecords.findIndex(r => r.user_id === user.id) + 1
        : null;

    console.log(`[SpeedRecord] 🏆 Novo recorde! ${durationSeconds}s (anterior: ${previousBest ?? "nenhum"}) — Posição global: #${globalRank}`);

    return { isNewRecord: true, previousBest, globalRank };
}

/**
 * Busca os top N recordes globais (menores tempos, todos os casos).
 * Agrupa pelo melhor recorde de cada jogador (pega o menor tempo entre todos os casos).
 */
export async function fetchGlobalTopRecords(limit = 20) {
    const { data, error } = await supabase
        .from("speed_records")
        .select("user_id, case_id, duration_seconds, nickname, rank, avatar, avatar_key, created_at")
        .order("duration_seconds", { ascending: true })
        .limit(limit * 3); // Pega mais pra filtrar duplicatas por jogador

    if (error) {
        console.error("[SpeedRecord] Erro ao buscar recordes globais:", error.message);
        return [];
    }

    // Agrupa: pega o melhor (menor tempo) de cada jogador
    const bestByUser = {};
    for (const record of (data || [])) {
        if (!bestByUser[record.user_id] || record.duration_seconds < bestByUser[record.user_id].duration_seconds) {
            bestByUser[record.user_id] = record;
        }
    }

    // Ordena por tempo e limita
    return Object.values(bestByUser)
        .sort((a, b) => a.duration_seconds - b.duration_seconds)
        .slice(0, limit);
}

/**
 * Formata segundos em texto legível.
 * Ex: 3661 → "1h 01min 01s"
 */
export function formatDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    if (hours > 0) {
        return `${hours}h ${String(minutes).padStart(2, "0")}min ${String(seconds).padStart(2, "0")}s`;
    }
    if (minutes > 0) {
        return `${minutes}min ${String(seconds).padStart(2, "0")}s`;
    }
    return `${seconds}s`;
}
