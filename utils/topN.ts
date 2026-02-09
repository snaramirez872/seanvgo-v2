/**
 * Returns top N entries from a dict object
 * descending order
 */
export default function getTopN(dict: Record<string, number>, topN: number = 5) {
    return Object.entries(dict)
            .map(([key, value]) => ({ label: key, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, topN);
}