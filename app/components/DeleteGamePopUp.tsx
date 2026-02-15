"use client";

import { X } from "lucide-react";
import { DeleteGamePopUpProps } from "@/lib/types/types";

export default function DeleteGamePopUp({ title, onCancel, onConfirm, loading = false }: DeleteGamePopUpProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white">Delete Game</h3>
                    <button onClick={onCancel} className="cursor-pointer text-white/50 hover:text-white transition">
                        <X size={18} className="text-white/60" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 text-white">
                    <p>Are you sure you want to delete <span className="font-semibold">{title}</span>?</p>
                    <p className="mt-2 text-sm text-white/60">This action cannot be undone.</p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}