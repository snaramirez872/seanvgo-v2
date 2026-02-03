"use client";

import { useMemo } from "react";
import { useGames } from "@/hooks/getGames";
import { gamesAnalytics } from "@/utils/analytics";
import { GamesResponse } from "@/lib/types/types";

export default function Analytics() {
    const { games, loading, error } = useGames();

    const gamesResp: GamesResponse = useMemo(() => {
        return {
            data: games,
            count: games.length,
        }
    }, [games]);

    const analytics = useMemo(() => {
        if (!gamesResp.data.length) return null;
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

    const { 
        pubs, 
        devs, 
        plats,
        max_dev,
        max_pubs,
        max_plats,
        dev_perc,
        pub_perc,
        plat_perc
    } = analytics;

    return (
        <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <div>
                <p><b>Total Games: </b>{gamesResp.count}</p>
                <p>The Developer that you own the most games from is <span>{max_dev.key}</span> at <span>{max_dev.value}</span> owned games <span>({dev_perc}% of total)</span>.</p>
                <p>The Publisher that you own the most games from is <span>{max_pubs.key}</span> at <span>{max_pubs.value}</span> owned games <span>({pub_perc}% of total)</span>.</p>
                <p>The Platform that you own the most games on is <span>{max_plats.key}</span> at <span>{max_plats.value}</span> owned games <span>({plat_perc}% of total)</span>.</p>
            </div>
            <div className="flex">
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
                <div>
                    <h3>Platforms</h3>
                    <div>
                        <ul>
                            {Object.entries(plats).map(([platform, count]) => (
                                <li key={platform}>
                                    {platform} <b><i>({count})</i></b>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}