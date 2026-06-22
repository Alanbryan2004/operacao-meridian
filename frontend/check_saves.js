import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: './.env.local' });
if (!process.env.VITE_SUPABASE_URL) {
    dotenv.config({ path: './.env' });
}

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSaves() {
    console.log("Checking saves for user 6704a1fc-50f6-42a9-927b-6fb112e68bfc");
    const { data, error } = await supabase
        .from('game_saves')
        .select('slot, updated_at, version')
        .eq('user_id', '6704a1fc-50f6-42a9-927b-6fb112e68bfc');
    
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Saves:", data);
    }
}
checkSaves();
