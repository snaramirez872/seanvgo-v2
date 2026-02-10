import { ChevronDown, ChevronUp } from "lucide-react";
import { SortableThProps } from "@/lib/types/types";

export default function SortableTh({
    label,
    sortKey,
    activeKey,
    sortDir,
    onSort,
    className = "",
}: SortableThProps) {
    const isActive = activeKey === sortKey;

    return (
        <th
            onClick={() => onSort(sortKey)}
            className={`py-3 px-4 border-r border-white/10 cursor-pointer select-none hover:text-white transition ${className}`}
            aria-sort={isActive ? sortDir === "asc" ? "ascending" : "descending" : "none"}
        >
            <div className="flex items-center gap-1">
                <span>{label}</span>

                {isActive && (
                    sortDir === "asc" ? (
                        <ChevronUp size={14} className="text-white/70" />
                    ) : (
                        <ChevronDown size={14} className="text-white/70" />
                    )
                )}
            </div>
        </th>
    );
}