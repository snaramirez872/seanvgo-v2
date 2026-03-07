"use client";

import { useMemo } from "react";
import { useGames } from "@/hooks/getGames";
import { gamesAnalytics } from "@/utils/analytics";
import { GamesResponse } from "@/lib/types/types";
import SummaryCard from "../components/SummaryCard";
import getTopN from "@/utils/topN";
import BreakdownCard from "../components/BreakdownCard";
import StatCard from "../components/StatCard";

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
            <div className="px-6 md:px-20 py-10">
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                <div className="rounded-2xl bg-white/5 backdrop-blur-md p-6">
                    <p className="text-white/70 animate-pulse">
                        Loading ...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-6 md:px-20 py-10">
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6">
                    <p className="text-red-400 text-sm">
                        Something went wrong while loading analytics.
                    </p>
                    <p className="text-red-400/70 text-xs mt-2">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="px-6 md:px-20 py-10">
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                <div className="rounded-2xl bg-white/5 backdrop-blur-md border p-6">
                    <p className="text-white/60 text-sm">
                        No analytics data available yet.
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                        Add some games to start seeing insights.
                    </p>
                </div>
            </div>
        );
    }

    const { 
        pubs, 
        devs, 
        plats,
        genres,
        max_dev,
        max_pubs,
        max_plats,
        max_genres,
        dev_perc,
        pub_perc,
        plat_perc,
        genres_perc,
        uniqueDevs,
        uniquePubs,
        allYears,
        max_year,
        years_perc,
        gamesPerDecade
    } = analytics;

    // Breakdown Prep
    let topPubs = getTopN(pubs, 5);
    let topDevs = getTopN(devs, 5);
    let topPlats = getTopN(plats, 5);
    let topGenres = getTopN(genres, 5);
    let topDecades = getTopN(gamesPerDecade, 5);

    return (
        <div className="px-6 md:px-20 py-10">
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                <SummaryCard 
                    label="Total Games"
                    value={gamesResp.count}
                    subtext="In your collection"
                />
                <SummaryCard 
                    label="Top Developer"
                    value={max_dev.key}
                    subtext={`${max_dev.value} games · ${dev_perc}%`}
                />
                <SummaryCard 
                    label="Top Publisher"
                    value={max_pubs.key}
                    subtext={`${max_pubs.value} games · ${pub_perc}%`}
                />
                <SummaryCard 
                    label="Top Platform"
                    value={max_plats.key}
                    subtext={`${max_plats.value} games · ${plat_perc}%`}
                />
                <SummaryCard 
                    label="Top Genre"
                    value={max_genres.key}
                    subtext={`${max_genres.value} games · ${genres_perc}%`}
                />
                <SummaryCard 
                    label="Favorite Year of Gaming"
                    value={max_year.key}
                    subtext={`${max_year.value} games · ${years_perc}%`}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard
                    title="Unique Developers"
                    value={uniqueDevs}
                    subtitle="Developers represented in your library"
                />
                <StatCard
                    title="Unique Publishers"
                    value={uniquePubs}
                    subtitle="Publishers represented in your library"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                <BreakdownCard 
                    title="Top Developers"
                    subtitle="Developers of your collection"
                    items={topDevs}
                />
                <BreakdownCard 
                    title="Top Publishers"
                    subtitle="Most common in your collection"
                    items={topPubs}
                />
                <BreakdownCard 
                    title="Top Platforms"
                    subtitle="Platforms you play on"
                    items={topPlats}
                />
                <BreakdownCard 
                    title="Top Genres"
                    subtitle="Genres you prefer"
                    items={topGenres}
                />
                <BreakdownCard 
                    title="Top Decades"
                    subtitle="Your favorite decades in gaming history"
                    items={topDecades}
                />
            </div>
        </div>
    );
}