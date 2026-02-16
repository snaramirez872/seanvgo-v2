"use client";

import { useEffect, useState, useMemo } from "react";
import { useGames } from "@/hooks/getGames";
import { Search, Pencil, Trash } from "lucide-react";
import { SortKey, SortDir, Game } from "@/lib/types/types";
import { getNextSort } from "@/utils/getNextSort";
import SortableTh from "./SortableTh";
import GamePopUp from "./GamePopUp";
import DeleteGamePopUp from "./DeleteGamePopUp";
import { useGameMutations } from "@/hooks/useGameMutations";

export default function Games() {
    const { games, loading, error, refetch } = useGames();
    const backend = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCAL_URL
        : process.env.NEXT_PUBLIC_API_DEPLOYED_URL;
    const { deleteGame } = useGameMutations(backend!);

    const [query, setQuery] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>("asc");
    const [modalOpen, setModalOpen] = useState(false);
    //const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<{ id: number; title: string } | null>(null);

    // For Search
    const filteredGames = useMemo(() => {
        if (!searchTerm.trim()) return games;

        const keywords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

        return games.filter(game => {
            const searchableText = [
                game.title,
                game.developer,
                game.publisher,
                game.platform,
                game.genres
            ].join(" ").toLowerCase();

            return keywords.every(kw => searchableText.includes(kw));
        });
    }, [games, searchTerm]);

    const handleSearch = () => {
        setSearchTerm(query);
    }

    // For Sorting
    const handleSort = (key: SortKey) => {
        const next = getNextSort(sortKey, sortDir, key);
        setSortKey(next.sortKey);
        setSortDir(next.sortDir);
    }

    const sortedGames = useMemo(() => {
        if (!sortKey) return filteredGames;
        const copy = [...filteredGames];

        copy.sort((a, b) => {
            const normalize = (val: string | string[]) =>
                Array.isArray(val) ? val.join(", ") : val;

            const aVal = normalize(a[sortKey]).toLowerCase();
            const bVal = normalize(b[sortKey]).toLowerCase();

            if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDir === "asc" ? 1: -1;
            return 0
        });

        return copy;
    }, [filteredGames, sortKey, sortDir])

    // For Pagination
    const totalPages = Math.ceil(sortedGames.length / pageSize);

    const paginatedGames = useMemo(() => {
        const start = (currPage - 1) * pageSize;
        const end = start + pageSize;
        return sortedGames.slice(start, end);
    }, [sortedGames, currPage, pageSize]);

    useEffect(() => {
        setCurrPage(1);
    }, [searchTerm, pageSize])

    // Helper to make data readable
    const formatValue = (val: string | string[]) => {
        if (!val) return "---";
        if (Array.isArray(val)) return val.join(", ");
        return val;
    };

    // Delete Game
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this game?")) return;

        try {
            await deleteGame(id); // call the hook
            refetch(); // refresh the table
        } catch (err) {
            console.error("Failed to delete game:", err);
            alert("Failed to delete game");
        }
    };

    if (loading) {
        return (
            <div className="px-6 md:px-20 py-10">
                <h2 className="text-2xl font-bold mb-4">Games</h2>
                <p className="text-white/70">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-6 md:px-20 py-10">
                <h2 className="text-2xl font-bold mb-4">Games</h2>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="px-6 md:px-20 py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Games</h2>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                        />
                        <input 
                            type="text"
                            placeholder="Search games..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            className="w-full rounded-lg bg-white/10 pl-10 pr-4 py-2
                                       text-white placeholder:text-white/40
                                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                                       transition"
                        />
                    </div>
                    <button 
                        onClick={handleSearch}
                        className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => {
                            //setModalMode("add");
                            setSelectedGame(null);
                            setModalOpen(true);
                        }}
                        className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-white
                                hover:bg-white/20 transition border border-white/10"
                    >
                        + Add Game
                    </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-225 w-full border-collapse text-sm">
                    <thead className="bg-white/5 sticky top-0 z-10">
                        <tr className="text-left text-white/70">
                            <SortableTh 
                                label="Title"
                                sortKey="title"
                                activeKey={sortKey}
                                sortDir={sortDir}
                                onSort={handleSort}
                                className="border-r border-white/10"
                            />
                            <SortableTh 
                                label="Developer"
                                sortKey="developer"
                                activeKey={sortKey}
                                sortDir={sortDir}
                                onSort={handleSort}
                                className="hidden sm:table-cell border-r border-white/10"
                            />
                            <SortableTh 
                                label="Publisher"
                                sortKey="publisher"
                                activeKey={sortKey}
                                sortDir={sortDir}
                                onSort={handleSort}
                                className="hidden md:table-cell border-r border-white/10"
                            />
                            <SortableTh 
                                label="Platform"
                                sortKey="platform"
                                activeKey={sortKey}
                                sortDir={sortDir}
                                onSort={handleSort}
                                className="border-r border-white/10"
                            />
                            <SortableTh 
                                label="Genres"
                                sortKey="genres"
                                activeKey={sortKey}
                                sortDir={sortDir}
                                onSort={handleSort}
                                className="hidden lg:table-cell"
                            />
                            <th className="py-3 px-4 border-r border-white/10 cursor-pointer select-none hover:text-white transition">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {paginatedGames.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={5} 
                                    className="py-10 text-center text-white/50"
                                >
                                    No Results Found</td>
                            </tr>
                        ) : (
                            paginatedGames.map((fg) => (
                                <tr 
                                    key={fg.id}
                                    className="odd:bg-white/2 hover:bg-white/5 transition-colors"
                                >
                                    <td 
                                        className="py-3 px-4 font-medium text-white whitespace-nowrap border-r border-white/10"
                                    >
                                        {fg.title}
                                    </td>
                                    <td className="py-3 px-4 hidden sm:table-cell text-white/70 whitespace-nowrap border-r border-white/10">
                                        {formatValue(fg.developer)}
                                    </td>
                                    <td className="py-3 px-4 hidden md:table-cell text-white/70 whitespace-nowrap border-r border-white/10">
                                        {formatValue(fg.publisher)}
                                    </td>
                                    <td className="py-3 px-4 text-white/70 whitespace-nowrap border-r border-white/10">
                                        {formatValue(fg.platform)}
                                    </td>
                                    <td className="py-3 px-4 hidden lg:table-cell text-white/60">
                                        {formatValue(fg.genres)}
                                    </td>
                                    <td className="py-3 px-4 text-white/70 whitespace-nowrap border-r border-white/10">
                                        <div className="flex gap-2 items-center float-right">
                                            <Pencil
                                                size={20}
                                                className="text-indigo-500 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedGame(fg);
                                                    setModalOpen(true);
                                                }}
                                            />
                                            <Trash 
                                                size={20} 
                                                className="text-red-500 cursor-pointer" 
                                                onClick={() => {
                                                    setGameToDelete({ id: fg.id, title: fg.title });
                                                    setDeleteModalOpen(true);
                                                }} 
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                {/* Page Size */}
                <div className = "flex items-center gap-2 text-sm text-white/70">
                    <span>Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="rounded-md bg-white/10 px-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={5} className="text-black">5</option>
                        <option value={10} className="text-black">10</option>
                    </select>
                </div>
                
                {/* Page Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrPage((p) => Math.max(1, p - 1))}
                        disabled={currPage === 1}
                        className="px-3 py-1 rounded-lg bg-white/10 text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                    >
                        Prev
                    </button>

                    <span className="text-sm text-white/70">
                        Page {currPage} of {totalPages || 1}
                    </span>

                    <button
                        onClick={() =>
                            setCurrPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currPage === totalPages || totalPages === 0}
                        className="px-3 py-1 rounded-lg bg-white/10 text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                    >
                      Next
                    </button>
                </div>
            </div>

            {/* Add/Edit Game Pop Up*/}
            {modalOpen && (
                <GamePopUp
                    mode={selectedGame? "edit" : "add"}
                    game={selectedGame}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedGame(null);
                    }}
                    onSuccess={() => {
                        setModalOpen(false);
                        setSelectedGame(null);
                        refetch();
                    }}
                />
            )}

            {/* Delete Game Pop Up */}
            {deleteModalOpen && gameToDelete && (
                <DeleteGamePopUp
                    title={gameToDelete.title}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={async () => {
                        try {
                            await deleteGame(gameToDelete.id);
                            setDeleteModalOpen(false);
                            refetch();
                        } catch (err) {
                            console.error(err);
                            alert("Failed to delete game");
                        }
                    }}
                />
            )}
        </div>
    );
}