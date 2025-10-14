import supabase from "../supabase/supabase-client";

export async function listMyPrograms() {
    const { data, error } = await supabase
        .from("training_programs")
        .select('*')
        .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
}

export async function createProgram(name) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
        .from("training_programs")
        .insert({ user_id: user.id, name })
        .select()
        .single();
    if (error) throw error;
    return data;
}