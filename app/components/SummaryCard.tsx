import { SummaryCardProps } from "@/lib/types/types";

export default function SummaryCard({ label, value, subtext }: SummaryCardProps) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
            <p className="text-sm text-white/60 mb-1">
                {label}
            </p>
            <p className="text-3xl font-bold text-white">
                {value}
            </p>

            {subtext && (
                <p className="mt-1 text-sm text-white/50">
                    {subtext}
                </p>
            )}
        </div>
    );
}