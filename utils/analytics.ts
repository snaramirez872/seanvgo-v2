import { GamesResponse } from "@/lib/types/types";

export function gamesAnalytics(resp: GamesResponse) {
    let pubs: Record<string, number> = {};
    let devs: Record<string, number> = {};
    
    let dat_pubs = resp.data.flatMap(g => g.publisher);
    let dat_devs = resp.data.flatMap(g => g.developer);

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

    return {
        pubs,
        devs
    }
}