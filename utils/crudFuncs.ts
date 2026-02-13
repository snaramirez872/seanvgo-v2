import { supabase } from "@/lib/supabaseClient";
import { NewGame } from "@/lib/types/types";

export async function insertGame(game: NewGame) {
    const { data, error } = await supabase.from("games_list").insert([game]).select().single();

    if (error) {
        console.error("Insert Game Error:", error);
        throw new Error(error.message);
    }

    if (!data) throw new Error("No data returned after insert");
    return data;
}