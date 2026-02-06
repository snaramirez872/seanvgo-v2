export type Game = {
    id: number,
    created_at: Date,
    title: string,
    publisher: string[],
    developer: string[],
    platform: string[],
    genres: string[];
}

export type GamesResponse = {
    count: number;
    data: Game[];
}