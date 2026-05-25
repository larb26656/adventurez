import { useState, useMemo } from "react";
import CheatsheetCard from "./CheatsheetCard";
import type { Cheatsheet } from "../data/cheatsheets";
import { Checkbox } from "./ui";

const ALL_CATEGORIES = ["Technology", "AI", "Design", "Data"] as const;

interface FilterOptionProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  activeClass?: string;
}

function FilterOption({
  checked,
  onChange,
  label,
  count,
  activeClass = "",
}: FilterOptionProps) {
  return (
    <label
      className={`flex items-center gap-[10px] py-1.5 cursor-pointer typo-nav text-foreground transition-colors ${activeClass}`}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        primaryColorClass={checked ? "text-emerald-500" : ""}
      />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto typo-caption text-muted">{count}</span>
      )}
    </label>
  );
}

interface Props {
  cheatsheets: Cheatsheet[];
}

export default function CheatsheetFilter({ cheatsheets }: Props) {
  const [filters, setFilters] = useState<Record<string, string>>({
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {
      Technology: 0,
      AI: 0,
      Design: 0,
      Data: 0,
    };
    cheatsheets.forEach((c) => {
      c.categories.forEach((cat) => {
        if (counts[cat] !== undefined) counts[cat]++;
      });
    });
    return counts;
  }, [cheatsheets]);

  const filteredCheatsheets = useMemo(() => {
    return cheatsheets.filter((cheatsheet) => {
      const title = cheatsheet.title.toLowerCase();

      const matchCat =
        filters.category === "all" ||
        cheatsheet.categories.includes(filters.category);
      const matchSearch =
        !searchQuery || title.includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [cheatsheets, filters, searchQuery]);

  const handleFilterChange = (group: string, value: string) => {
    setFilters((prev) => ({ ...prev, [group]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: "all" });
    setSearchQuery("");
  };

  const labels: Record<string, Record<string, string>> = {
    category: {
      Technology: "Technology",
      AI: "AI",
      Design: "Design",
      Data: "Data",
    },
  };

  const categoryOptions = useMemo(
    () => [
      { key: "all", label: "All", count: cheatsheets.length },
      ...ALL_CATEGORIES.map((cat) => ({
        key: cat,
        label: cat,
        count: categoryCount[cat],
      })),
    ],
    [cheatsheets.length, categoryCount],
  );

  const activePills = Object.entries(filters)
    .filter(([key, value]) => value !== "all" && labels[key]?.[value])
    .map(([key, value]) => ({ key, value, label: labels[key][value] }));

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 items-start">
        <aside className="bg-surface border border-border rounded-[14px] p-4 sm:p-6 lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5 typo-h3 text-foreground">
            Filters
            <button
              className="typo-label text-emerald-500 bg-none border-none cursor-pointer"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <input
            type="text"
            className="w-full px-3 py-2.5 border border-border rounded-[8px] bg-bg typo-body text-foreground leading-none outline-none transition-colors mb-4 sm:mb-5 placeholder:text-muted focus:border-emerald-500"
            placeholder="Search cheatsheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="mb-4 sm:mb-6 last:mb-0">
            <div className="typo-badge text-muted mb-2 sm:mb-3">Category</div>
            {categoryOptions.map(({ key, label, count }) => (
              <FilterOption
                key={key}
                checked={filters.category === key}
                onChange={() => handleFilterChange("category", key)}
                label={label}
                count={count}
                activeClass={filters.category === key ? "text-emerald-500" : ""}
              />
            ))}
          </div>
        </aside>

        <div>
          {activePills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activePills.map(({ key, value, label }) => (
                <button
                  key={`${key}-${value}`}
                  className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 typo-badge py-1.5 px-2.5 rounded-full border-none cursor-pointer hover:bg-emerald-500/20 transition-colors"
                  onClick={() => handleFilterChange(key, "all")}
                >
                  {label} <span className="text-[14px] leading-none">×</span>
                </button>
              ))}
            </div>
          )}
          <div className="typo-caption text-muted mb-4 sm:mb-5">
            Showing{" "}
            <strong className="text-foreground font-semibold">
              {filteredCheatsheets.length}
            </strong>{" "}
            cheatsheet
            {filteredCheatsheets.length !== 1 ? "s" : ""}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5">
            {filteredCheatsheets.length > 0 ? (
              filteredCheatsheets.map((cheatsheet) => (
                <CheatsheetCard
                  key={cheatsheet.id}
                  title={cheatsheet.title}
                  description={cheatsheet.description}
                  tags={cheatsheet.tags}
                  href={cheatsheet.href}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-8 sm:p-16">
                <strong className="typo-h3 text-foreground block mb-2">
                  ไม่พบ cheatsheet
                </strong>
                <span className="typo-body-sm text-muted">
                  ลองปรับเปลี่ยนตัวกรองการค้นหาของคุณ
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}