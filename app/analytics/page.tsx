"use client";

import { useMemo } from "react";
import { useGames } from "@/hooks/getGames";
import { gamesAnalytics } from "@/utils/analytics";
import { GamesResponse } from "@/lib/types/types";

export default function Analytics() {
    const { games, loading, error } = useGames();

    const gamesResp: GamesResponse | null = useMemo(() => {
        if (!games.length) return null;

        return {
            data: games,
            count: games.length,
        }
    }, [games]);

    const analytics = useMemo(() => {
        if (!gamesResp) return null;
        return gamesAnalytics(gamesResp);
    }, [gamesResp]);

    if (loading) {
        return (
            <div>
                <h1>Analytics</h1>
                <div>
                    <p>Loading ...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Analytics</h1>
                <div>
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div>
                <h1>Analytics</h1>
                <div>
                    <p>No Data</p>
                </div>
            </div>
        );
    }

    const { pubs, devs } = analytics;

    return (
        <div>
            <h1>Analytics</h1>
            <div>
                <div>
                    <h3>Publishers</h3>
                    <div>
                        <ul>
                            {Object.entries(pubs).map(([publisher, count]) => (
                                <li key={publisher}>
                                    {publisher} <b><i>({count})</i></b>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h3>Developers</h3>
                    <div>
                        <ul>
                            {Object.entries(devs).map(([developer, count]) => (
                                <li key={developer}>
                                    {developer} <b><i>({count})</i></b>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}