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
    
    let dat_pubs = resp.data.flatMap(g => g.publisher);
    let dat_devs = resp.data.flatMap(g => g.developer);
    let dat_plats = resp.data.flatMap(g => g.platform);

    for (let i = 0; i < dat_pubs.length; ++i) {
        if (dat_pubs[i] in pubs) {
            pubs[dat_pubs[i]] += 1;
        } else {
            pubs[dat_pubs[i]] = 1;
        }
    }
    
    for (let j = 0; j < dat_devs.length; ++j) {
        if (dat_devs[j] in devs) {
            devs[dat_devs[j]] += 1;
        } else {
            devs[dat_devs[j]] = 1;
        }
    }

    for (let k = 0; k < dat_plats.length; ++k) {
        if (dat_plats[k] in plats) {
            plats[dat_plats[k]] += 1;
        } else {
            plats[dat_plats[k]] = 1;
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

    // Percentages
    let dev_perc = toPercent(max_dev.value, resp.count);
    let pub_perc = toPercent(max_pubs.value, resp.count);
    let plat_perc = toPercent(max_plats.value, resp.count);

    return {
        pubs,
        devs,
        plats,
        max_dev,
        max_pubs,
        max_plats,
        dev_perc,
        pub_perc,
        plat_perc
    }
}