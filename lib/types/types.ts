export type Game = {
    id: number,
    created_at: string,
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

export type NewGame = Omit<Game, "id" | "created_at">

//export type UpdateGame = Partial<NewGame> & { id: number };

export type AddGameProps = {
    onSuccess?: () => void;
    onClose: () => void;
    game?: Game | null;
}

export type InputProps = {
    label: string;
    value: string;
    onChange: (v: string) => void;
    hint?: string;
}

export type DeleteGamePopUpProps = {
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    loading?: boolean;
}