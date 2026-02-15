"use client";

import { supabase } from "@/lib/supabaseClient";
import { NewGame } from "@/lib/types/types";

export function useGameMutations(backend: string) {
    const getSession = async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error || !session) {
            throw new Error("Not authenticated");
        }

        return session;
    };

    const insertGame = async (game: NewGame) => {
        const session = await getSession();

        const resp = await fetch(`${backend}/api/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(game),
        });

        if (!resp.ok) {
            throw new Error("Failed to insert game");
        }

        return await resp.json();
    };

    const deleteGame = async (id: number) => {
        const session = await getSession();

        const resp = await fetch(`${backend}/api/games/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        });

        if (!resp.ok) {
            throw new Error("Failed to delete game");
        }
    };

    return {
        insertGame,
        deleteGame,
    };
}