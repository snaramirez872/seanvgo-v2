"use client";

import { useState } from "react";
import { insertGame } from "@/utils/crudFuncs";
import { AddGameProps } from "@/lib/types/types";
import { X } from "lucide-react";
import Input from "./Input";

export default function GamePopUp({ onSuccess, onClose }: AddGameProps) {
    const [form, setForm] = useState({
        title: "",
        developer: "",
        publisher: "",
        platform: "",
        genres: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            await insertGame({
                title: form.title,
                developer: toArray(form.developer),
                publisher: toArray(form.publisher),
                platform: toArray(form.platform),
                genres: toArray(form.genres),
            });

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
                        Add Game
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
                        {loading ? "Saving..." : "Add Game"}
                    </button>
                </div>
            </div>
        </div>
    );
}