import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-[600px] relative mb-12 group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Find adventers..."
        className="w-full border-b-2 border-gray-500  py-4 pl-14 pr-6 outline-none focus:border-white transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
