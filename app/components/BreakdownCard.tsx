"use client";

import { BreakdownItem, BreakdownCardProps } from "@/lib/types/types";

export default function BreakdownCard({
    title,
    subtitle,
    items,
    maxItems = 5,
}: BreakdownCardProps) {
    let visibleItems = items.slice(0, maxItems);

    return (
        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5">
            {/* Header */}
            <div className="mb-3">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-xs text-white/50 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* List */}
            <ul className="space-y-2">
                {visibleItems.map((item) => (
                    <li
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="text-white/80 truncate">
                            {item.label}
                        </span>
                        <span className="text-white/50 tabular-nums">
                            {item.value}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Empty */}
            {visibleItems.length === 0 && (
                <p className="text-sm text-white/40">
                    No data available
                </p>
            )}
        </div>
    );
}