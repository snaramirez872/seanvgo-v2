"use client";

import { useState, useEffect } from "react";
import { useGameMutations } from "@/hooks/useGameMutations";
import { AddGameProps, Game } from "@/lib/types/types";
import { X } from "lucide-react";
import Input from "./Input";

type GamePopUpProps = AddGameProps & {
    mode?: "add" | "edit"; // default to "add"
    game?: Game | null;
};

export default function GamePopUp({ onSuccess, onClose, mode = "add", game }: GamePopUpProps) {
    const backend = process.env.NODE_ENV === "development" 
        ? process.env.NEXT_PUBLIC_API_LOCAL_URL 
        : process.env.NEXT_PUBLIC_API_DEPLOYED_URL;
    const { insertGame, updateGame } = useGameMutations(backend!);

    const [form, setForm] = useState({
        title: "",
        developer: "",
        publisher: "",
        platform: "",
        genres: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "edit" && game) {
            const toString = (val: string | string[]) =>
                Array.isArray(val) ? val.join(", ") : val ?? "";
            setForm({
                title: game.title,
                developer: toString(game.developer),
                publisher: toString(game.publisher),
                platform: toString(game.platform),
                genres: toString(game.genres),
            });
        }
    }, [mode, game]);

    const update = (key: keyof typeof form, value: string) => { setForm(prev => ({ ...prev, [key]: value})); }

    const toArray = (val: string) => val.split(",").map(v => v.trim()).filter(Boolean);

    const handleSubmit = async () => {
        if (!form.title.trim()) {
            setError("Title is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (mode === "add") {
                await insertGame({
                    title: form.title,
                    developer: toArray(form.developer),
                    publisher: toArray(form.publisher),
                    platform: toArray(form.platform),
                    genres: toArray(form.genres),
                });
            } else if (mode === "edit" && game?.id) {
                await updateGame(game.id, {
                    title: form.title,
                    developer: toArray(form.developer),
                    publisher: toArray(form.publisher),
                    platform: toArray(form.platform),
                    genres: toArray(form.genres),
                });
            }

            setForm({
                title: "",
                developer: "",
                publisher: "",
                platform: "",
                genres: "",
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white">
                        {mode === "add" ? "Add Game" : "Edit Game"}
                    </h3>
                    <button onClick={onClose} className="cursor-pointer text-white/50 hover:text-white transition">
                        <X size={18} className="text-white/60" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    <Input 
                        label="Title" 
                        value={form.title} 
                        onChange={v => update("title", v)} 
                    />
                    <Input 
                        label="Developer" 
                        hint="If more than one, comma separated" 
                        value={form.developer} 
                        onChange={v => update("developer", v)} 
                    />
                    <Input 
                        label="Publisher" 
                        hint="If more than one, comma separated" 
                        value={form.publisher} 
                        onChange={v => update("publisher", v)} 
                    />
                    <Input 
                        label="Platform" 
                        hint="If more than one, comma separated" 
                        value={form.platform} 
                        onChange={v => update("platform", v)} 
                    />
                    <Input 
                        label="Genres" 
                        hint="If more than one, comma separated" 
                        value={form.genres} 
                        onChange={v => update("genres", v)} 
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="cursor-pointer px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Saving..." : mode === "add" ? "Add Game" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}