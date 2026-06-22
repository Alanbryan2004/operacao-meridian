import { supabase } from "./src/lib/supabase.js";

async function test() {
    const { data: saves, error } = await supabase.from("game_saves").select("*");
    if (error) console.error("Erro:", error);
    if (saves && saves.length > 0) {
        const state = saves[0].state;
        console.log("Captured Suspects:");
        console.dir(state.capturedSuspects, { depth: null });
    } else {
        console.log("Nenhum save encontrado ou erro de RLS.");
    }
}
test();
