import { SortKey, SortDir } from "@/lib/types/types";

export function getNextSort(
    currentKey: SortKey | null,
    currentDir: SortDir,
    clickedKey: SortKey
): { sortKey: SortKey; sortDir: SortDir } {
    if (currentKey === clickedKey) {
        return {
            sortKey: currentKey,
            sortDir: currentDir === "asc" ? "desc" : "asc",
        };
    }

    return {
        sortKey: clickedKey,
        sortDir: "asc" as SortDir,
    }
}