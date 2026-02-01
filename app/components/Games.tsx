"use client";

import { useGames } from "@/hooks/getGames";

export default function Games() {
    const { games, loading, error } = useGames();

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Developer</td>
                        <td>Publisher</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td>{game.developer}</td>
                            <td>{game.publisher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}