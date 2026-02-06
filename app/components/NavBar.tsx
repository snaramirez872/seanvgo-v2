"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
export default function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);

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
        <nav className="flex items-center justify-between">
            <div>
                <h1>SeanVGO</h1>
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link href="/">Games</Link>
                        <Link href="/analytics">Analytics</Link>
                    </>
                ) : (
                    <>
                        <span>Games</span>
                        <span>Analytics</span>
                    </>
                )}

                {isLoggedIn ? (
                    <button onClick={handleSignOut}>Sign Out</button>
                ) : (
                    <Link href="/login">Sign In</Link>
                )}
            </div>
        </nav>
    );
}