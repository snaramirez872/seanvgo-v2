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