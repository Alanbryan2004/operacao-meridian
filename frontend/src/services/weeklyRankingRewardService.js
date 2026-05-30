import { supabase } from "../lib/supabase";

/**
 * Lógica de Recompensa e Notificação de Ranking Semanal
 */

// Recompensas por posição no ranking semanal
const WEEKLY_RANK_REWARDS = {
    1: { 
        moedas: 20000, 
        items: { dossie_sigiloso: 1, fonte_anonima: 1 } 
    },
    2: { 
        moedas: 10000, 
        items: { fonte_anonima: 1 } 
    },
    3: { 
        moedas: 5000, 
        items: { satelite_atlas: 1 } 
    }
};

/**
 * Checa se há alguma recompensa de ranking semanal pendente de resgate.
 * Retorna os detalhes da recompensa/posição caso exista.
 */
export async function checkWeeklyRankingReward(userId) {
    try {
        const { data, error } = await supabase
            .from("weekly_rank_history")
            .select("*")
            .eq("user_id", userId)
            .eq("claimed", false)
            .order("reset_date", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error("[weeklyRankingRewardService] Erro ao carregar ranking semanal:", error.message);
            return { show: false };
        }

        if (!data) {
            return { show: false };
        }

        const rankPos = data.rank_position;
        const rewards = WEEKLY_RANK_REWARDS[rankPos] || { moedas: 0, items: null };

        return {
            show: true,
            id: data.id,
            rankPosition: rankPos,
            moedas: rewards.moedas,
            items: rewards.items,
            resetDate: data.reset_date
        };
    } catch (err) {
        console.error("[weeklyRankingRewardService] Erro inesperado:", err);
        return { show: false };
    }
}

/**
 * Marca um registro de ranking semanal como resgatado no banco de dados.
 */
export async function claimWeeklyRankingReward(rowId) {
    try {
        const { error } = await supabase
            .from("weekly_rank_history")
            .update({ 
                claimed: true, 
                reward_claimed_at: new Date().toISOString() 
            })
            .eq("id", rowId);

        if (error) {
            console.error("[weeklyRankingRewardService] Erro ao resgatar ranking semanal:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("[weeklyRankingRewardService] Erro inesperado no resgate:", err);
        return false;
    }
}
