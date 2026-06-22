import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
    const { data: profiles, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error("Error fetching profiles:", error);
        return;
    }
    console.log("Profiles count:", profiles.length);
    // Let's find if there are duplicate nicknames or something indicating duplicate users
    const nicknames = profiles.map(p => p.nickname);
    const duplicates = nicknames.filter((item, index) => nicknames.indexOf(item) !== index);
    console.log("Duplicate nicknames:", duplicates);
}

check();
