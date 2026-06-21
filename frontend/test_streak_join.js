import { supabase } from "./src/lib/supabase.js";

async function test() {
    const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
        email: "alanbryan2004@gmail.com", // I don't know the email. I'll just skip this.
        password: "password"
    });
}
test();
