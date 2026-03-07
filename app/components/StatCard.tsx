"use client";
import { StatCardProps } from "@/lib/types/types";

export default function StatCard({ title, value, subtitle }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
            <div className="flex flex-col gap-2">
                <p className="text-sm text-white/60 tracking-wide">
                    {title}
                </p>

                <p className="text-4xl font-bold text-white">
                    {value}
                </p>

                {subtitle && (
                    <p className="text-sm text-white/50">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}