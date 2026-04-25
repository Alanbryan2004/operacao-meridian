import { supabase } from "../src/lib/supabase";

async function testProfileUpdate() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("Not logged in");
        return;
    }

    console.log("Testing update for user:", user.id);
    const testPhrase = "Test Phrase " + Date.now();
    
    const { data, error } = await supabase
        .from("profiles")
        .update({ frase: testPhrase })
        .eq("id", user.id)
        .select();

    if (error) {
        console.error("Update Error:", error);
    } else {
        console.log("Update Success:", data);
    }
}

testProfileUpdate();
