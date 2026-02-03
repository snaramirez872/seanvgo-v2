"use client";

import { useState, useMemo } from "react";
import { useGames } from "@/hooks/getGames";

export default function Games() {
    const { games, loading, error } = useGames();
    const [query, setQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGames = useMemo(() => {
        if (!searchTerm.trim()) return games;

        const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

        return games.filter(game => {
            const searchableText = [
                game.title,
                game.developer,
                game.publisher,
                game.platform
            ].join(" ").toLowerCase();

            return keywords.every(kw => searchableText.includes(kw));
        });
    }, [games, searchTerm]);

    const handleSearch = () => {
        setSearchTerm(query);
    }

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold">Games</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold">Games</h1>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Games</h1>
            <div>
                <input 
                    type="text"
                    placeholder="Search games..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handleSearch();
                    }}
                />
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Developer</td>
                        <td>Publisher</td>
                        <td>Platform</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center">No Results Found</td>
                        </tr>
                    ) : (
                        filteredGames.map((fg) => (
                            <tr key={fg.id}>
                                <td>{fg.title}</td>
                                <td>{fg.developer}</td>
                                <td>{fg.publisher}</td>
                                <td>{fg.platform}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}