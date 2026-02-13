import { InputProps } from "@/lib/types/types";

export default function Input({ label, value, onChange, hint }: InputProps) {
    return (
        <div>
            <label className="block text-sm text-white/60 mb-1">
                {label}
            </label>
            <input 
                value={value}
                onChange={e => onChange(e.target.value)}
                className="
                    w-full rounded-lg bg-white/10 px-3 py-2
                    text-white placeholder:text-white/40
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    transition
                "
            />
            {hint && (
                <p className="mt-1 text-xs text-white/40">
                    {hint}
                </p>
            )}
        </div>
    );
}