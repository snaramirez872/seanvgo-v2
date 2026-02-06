import { GamesResponse } from "@/lib/types/types";

export function gamesAnalytics(resp: GamesResponse) {
    // Helper Function
    function toPercent(value: number, total: number) {
        return Math.round((value / total) * 10000) / 100;
    }

    // Developer, Publisher, and Platform Counts
    let pubs: Record<string, number> = {};
    let devs: Record<string, number> = {};
    let plats: Record<string, number> = {};
    let genres: Record<string, number> = {};
    
    let dat_pubs = resp.data.flatMap(g => g.publisher);
    let dat_devs = resp.data.flatMap(g => g.developer);
    let dat_plats = resp.data.flatMap(g => g.platform);
    let dat_genres = resp.data.flatMap(g => g.genres);

    for (let i = 0; i < dat_pubs.length; ++i) {
        if (dat_pubs[i] in pubs) {
            pubs[dat_pubs[i]] += 1;
        } else {
            pubs[dat_pubs[i]] = 1;
        }
    }
    
    for (let i = 0; i < dat_devs.length; ++i) {
        if (dat_devs[i] in devs) {
            devs[dat_devs[i]] += 1;
        } else {
            devs[dat_devs[i]] = 1;
        }
    }

    for (let i = 0; i < dat_plats.length; ++i) {
        if (dat_plats[i] in plats) {
            plats[dat_plats[i]] += 1;
        } else {
            plats[dat_plats[i]] = 1;
        }
    }

    for (let i = 0; i < dat_genres.length; ++i) {
        if (dat_genres[i] in genres) {
            genres[dat_genres[i]] += 1;
        } else {
            genres[dat_genres[i]] = 1;
        }
    }

    // Developer, Publisher, and Platform Maxes
    let max_dev = Object.entries(devs).reduce(
        (max, [key, val]) =>
            val > max.value ? { key, value: val } : max,
        { key: "", value: 0 }
    );
    let max_pubs = Object.entries(pubs).reduce(
        (max, [key, val]) =>
            val > max.value ? { key, value: val } : max,
        { key: "", value: 0 }
    );
    let max_plats = Object.entries(plats).reduce(
        (max, [key, val]) =>
            val > max.value ? { key, value: val } : max,
        { key: "", value: 0 }
    );
    let max_genres = Object.entries(genres).reduce(
        (max, [key, val]) =>
            val > max.value ? { key, value: val } : max,
        { key: "", value: 0 }
    );

    // Percentages
    let dev_perc = toPercent(max_dev.value, resp.count);
    let pub_perc = toPercent(max_pubs.value, resp.count);
    let plat_perc = toPercent(max_plats.value, resp.count);
    let genres_perc = toPercent(max_genres.value, resp.count);

    return {
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
        genres_perc
    }
}