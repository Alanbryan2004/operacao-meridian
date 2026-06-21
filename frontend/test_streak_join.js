import { supabase } from "./src/lib/supabase.js";

async function fetchStreakRankings() {
    try {
        const { data: streaks, error: err1 } = await supabase
            .from("daily_streaks")
            .select("current_streak, user_id")
            .order("current_streak", { ascending: false })
            .limit(20);

        if (err1) throw err1;
        if (!streaks || streaks.length === 0) return [];

        const userIds = streaks.map(s => s.user_id);

        const { data: profiles, error: err2 } = await supabase
            .from("profiles")
            .select("id, nickname, rank, total_capturas, level, avatar, frase, avatar_key")
            .in("id", userIds);

        if (err2) throw err2;

        const merged = streaks.map(s => {
            const p = profiles.find(pr => pr.id === s.user_id);
            return {
                ...p,
                user_id: s.user_id,
                current_streak: s.current_streak
            };
        });

        console.log(merged);
        return merged;
    } catch (err) {
        console.error(err);
    }
}

fetchStreakRankings();
