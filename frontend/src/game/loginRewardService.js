import { supabase } from "../lib/supabase";

/**
 * Lógica de Recompensa de Login Diário
 */

function getLocalTodayStr() {
    const now = new Date();
    // Retorna YYYY-MM-DD em fuso local
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

const LOGIN_REWARDS = {
    1: 300,
    2: 500,
    3: 700,
    4: 900,
    5: 1000,
    30: 10000
};

export async function checkLoginReward(userId) {
    const todayStr = getLocalTodayStr();
    
    // 1. Busca os dados de streak do banco
    const { data: streak, error } = await supabase
        .from("login_streaks")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.error("[loginRewardService] Erro ao carregar streak de login:", error.message);
        return { show: false };
    }

    if (!streak) {
        // Primeiro login do usuário
        const newData = {
            user_id: userId,
            current_streak: 1,
            last_login_date: todayStr,
            last_reward_date: todayStr,
            highest_streak: 1
        };
        const { error: insErr } = await supabase.from("login_streaks").insert(newData);
        if (insErr) {
            console.error("[loginRewardService] Erro ao criar streak inicial:", insErr.message);
            return { show: false };
        }
        return { show: true, day: 1, reward: LOGIN_REWARDS[1] };
    }

    // Se já resgatou hoje, não mostra o popup de recompensa
    if (streak.last_reward_date === todayStr) {
        return { show: false, streak };
    }

    // 2. Calcula a diferença de dias desde o último login
    const lastDateParts = streak.last_login_date.split("-");
    const lastDate = new Date(lastDateParts[0], lastDateParts[1] - 1, lastDateParts[2]);
    lastDate.setHours(0, 0, 0, 0);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const diffMs = todayDate - lastDate;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    let newStreakCount = streak.current_streak;
    if (diffDays === 1) {
        // Sequência mantida
        newStreakCount += 1;
    } else if (diffDays > 1) {
        // Sequência perdida, recomeça do dia 1
        newStreakCount = 1;
    } else {
        // Mesmo dia (0), ou algo estranho (< 0). Se diffDays for 0 e last_reward_date for diferente, 
        // significa que ele logou hoje mas não resgatou ainda? 
        // Na verdade, diffDays ser 0 e last_reward_date não ser hoje é improvável se last_login_date for atualizado no resgate.
        // Mas vamos garantir que ele receba se ainda não recebeu hoje.
    }

    // 3. Determina o valor da recompensa
    let reward = 0;
    if (newStreakCount === 30) {
        reward = 10000;
    } else if (newStreakCount >= 5) {
        reward = 1000;
    } else {
        reward = LOGIN_REWARDS[newStreakCount] || 1000;
    }

    // 4. Atualiza o banco
    const updatedData = {
        current_streak: newStreakCount,
        last_login_date: todayStr,
        last_reward_date: todayStr,
        highest_streak: Math.max(streak.highest_streak, newStreakCount),
        updated_at: new Date().toISOString()
    };

    const { error: updErr } = await supabase
        .from("login_streaks")
        .update(updatedData)
        .eq("user_id", userId);

    if (updErr) {
        console.error("[loginRewardService] Erro ao atualizar streak:", updErr.message);
        return { show: false };
    }

    return { show: true, day: newStreakCount, reward };
}
