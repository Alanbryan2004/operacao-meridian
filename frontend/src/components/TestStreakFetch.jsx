import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TestStreakFetch() {
    useEffect(() => {
        supabase.from("daily_streaks").select("*").then(({ data }) => {
            console.log("Streaks fetched in browser:", data);
        });
    }, []);
    return null;
}
