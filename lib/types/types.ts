import { stringToBase64URL } from "@supabase/ssr";

export type Game = {
    id: number,
    created_at: Date,
    title: string,
    publisher: string | string[],
    developer: string | string[],
    platform: string | string[],
    genres: string | string[];
}

export type GamesResponse = {
    count: number;
    data: Game[];
}

export type SummaryCardProps = {
    label: string;
    value: string | number;
    subtext?: string;
}

export type BreakdownItem = {
    label: string,
    value: number
}

export type BreakdownCardProps = {
    title: string;
    subtitle?: string;
    items: BreakdownItem[];
    maxItems?: number;
}

export type SortKey = "title" | "developer" | "publisher" | "platform" | "genres";

export type SortDir = "asc" | "desc";

export type SortableThProps = {
    label: string;
    sortKey: SortKey;
    activeKey: SortKey | null;
    sortDir: SortDir;
    onSort: (key: SortKey) => void;
    className?: string;
}