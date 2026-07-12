const SUPABASE_URL = "https://mkysvelkncgzwjuhsons.supabase.co";

const SUPABASE_KEY = "sb_publishable_9aSOYkAoTQj_E56wWOOTYQ_jMyc6vhE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase připojena");
async function nactiDiscipliny() {

    const { data, error } = await supabaseClient
        .from("disciplines")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    console.table(data);
}

nactiDiscipliny();
async function nactiAktivniZavod() {

    const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .eq("active", true)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    console.log("Aktivní závod:");
    console.table(data);

}

nactiAktivniZavod();