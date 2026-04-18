import { supabase } from "../lib/supabase";

/**
 * Lógica de Sequência Diária (Streaks) e Recompensas (Vouchers)
 */

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
    const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
    
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

    const lastDate = new Date(existing.last_completion_date + "T12:00:00");
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    let updated = { ...existing };
    let newlyAwarded = null;

    if (diffDays === 0) {
        // Já completou hoje, nada a fazer para o streak
        console.log("[streakService] Missão do dia já contabilizada.");
        return { ...existing, newlyAwarded: null };
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
    if (updated.current_streak === 7) newlyAwarded = REWARDS.DAY_7;
    else if (updated.current_streak === 14) newlyAwarded = REWARDS.DAY_14;
    else if (updated.current_streak === 30) newlyAwarded = REWARDS.DAY_30;

    if (newlyAwarded) {
        updated.vouchers = [...(updated.vouchers || []), { ...newlyAwarded, id: Date.now() }];
    }

    await saveStreakData(updated);
    return { ...updated, newlyAwarded };
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
    const lastDate = new Date(data.last_completion_date + "T12:00:00");
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Perdeu o streak por inatividade
        const resetData = { ...data, current_streak: 0 };
        await saveStreakData(resetData);
        return resetData;
    }
    return data;
}
