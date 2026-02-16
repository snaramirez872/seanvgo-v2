"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Menu, X } from "lucide-react";

export default function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        }
    }, [menuOpen])

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setLoggedIn(!!data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setLoggedIn(!!session);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace("/login");
    };

    return (
        <>
        
            <nav className="flex items-center justify-between px-6 md:px-20 py-3 relative z-50">
                <div>
                    <Link href="/" className="text-3xl font-bold">SeanVGO</Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-7 text-xl">
                    {isLoggedIn ? (
                        <>
                            <Link href="/" className="text-white hover:text-indigo-600">Games</Link>
                            <Link href="/analytics" className="text-white hover:text-indigo-600">Analytics</Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white" title="Please Sign In">Games</span>
                            <span className="text-white" title="Please Sign In">Analytics</span>
                        </>
                    )}

                    {isLoggedIn ? (
                        <button onClick={handleSignOut} className="bg-indigo-600 px-3 py-2 rounded-xl hover:rounded-2xl hover:cursor-pointer hover:bg-indigo-800">Sign Out</button>
                    ) : (
                        <Link href="/login" className="bg-indigo-600 px-3 py-2 rounded-xl hover:rounded-2xl hover:bg-indigo-800">Sign In</Link>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
                    aria-label="Open menu"
                >
                    <Menu size={28} />
                </button>
            </nav>

            {/* Mobile Overlay */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-[rgb(0_4_20/0.8)] backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Side Menu */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-72
                 bg-[rgb(0_4_20/0.8)] backdrop-blur-xl shadow-xl
                 transform transition-transform duration-300
                 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col p-6 gap-6 text-lg text-white">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="self-end p-2 rounded-lg hover:bg-black/10 transition"
                        aria-label="Close menu"
                    >
                        <X size={28} />
                    </button>

                    {isLoggedIn ? (
                        <>
                            <Link href="/" onClick={() => setMenuOpen(false)}>
                                Games
                            </Link>
                            <Link href="/analytics" onClick={() => setMenuOpen(false)}>
                                Analytics
                            </Link>

                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleSignOut();
                                }}
                                className="mt-4 rounded-xl bg-indigo-600 py-2 text-white"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="opacity-60">Games</span>
                            <span className="opacity-60">Analytics</span>

                            <Link
                                href="/login"
                                onClick={() => setMenuOpen(false)}
                                className="mt-4 rounded-xl bg-indigo-600 py-2 text-white text-center"
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}