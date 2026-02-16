"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
        router.push("/")
    }

    return (
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/70 backdrop-blur-md shadow-xl px-6 sm:px-8 py-8 sm:py-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
                    Welcome Back
                </h2>
                <p className="text-sm sm:text-base text-gray-400 text-center mt-1">
                    Sign in to continue
                </p>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Email
                            </label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-gray-900
                                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                       transition"
                            />
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg bg-white px-4 py-2.5 text-gray-900
                                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                       transition"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <p className="text-sm text-red-600 text-center animate-fade-in">
                            {error}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full cursor-pointer rounded-xl bg-indigo-600 py-2.5 text-white font-medium
                                   transition-all duration-200
                                   hover:bg-indigo-700 hover:scale-[1.02]
                                   active:scale-[0.98]
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>
            </div>
        </div>
    );
}