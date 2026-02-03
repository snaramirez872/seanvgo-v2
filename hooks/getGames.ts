"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Game } from "@/lib/types/types";

export function useGames() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Links for Back End
    const local_url = process.env.NEXT_PUBLIC_API_LOCAL_URL;
    const deployed = process.env.NEXT_PUBLIC_API_DEPLOYED_URL;
    const backend = process.env.NODE_ENV === "development" ? local_url : deployed;

    useEffect(() => {
        async function fetchGames() {
            setLoading(true);
            setError(null);

            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session) {
                setError("Not authenticated");
                setLoading(false);
                return;
            }

            try {
                const resp = await fetch(
                    `${backend}/api/games`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error(`API error: ${resp.status}`);
                }

                const json = await resp.json();
                setGames(json.data);
            } catch (err: any) {
                setError(err.message ?? "Failed to fetch games");
            } finally {
                setLoading(false);
            }
        }

        fetchGames();
    }, []);

    return {
        games,
        loading,
        error
    }
}