import { useState, useMemo } from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../data/courses";
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
        primaryColorClass={checked ? "text-primary" : ""}
      />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto typo-caption text-muted">{count}</span>
      )}
    </label>
  );
}

interface Props {
  courses: Course[];
}

export default function CourseFilter({ courses }: Props) {
  const [filters, setFilters] = useState<Record<string, string>>({
    category: "all",
    status: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {
      Technology: 0,
      AI: 0,
      Design: 0,
      Data: 0,
    };
    courses.forEach((c) => {
      c.categories.forEach((cat) => {
        if (counts[cat] !== undefined) counts[cat]++;
      });
    });
    return counts;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const status = course.comingSoon ? "coming-soon" : "available";
      const title = course.title.toLowerCase();

      const matchCat =
        filters.category === "all" ||
        course.categories.includes(filters.category);
      const matchStatus = filters.status === "all" || status === filters.status;
      const matchSearch =
        !searchQuery || title.includes(searchQuery.toLowerCase());

      return matchCat && matchStatus && matchSearch;
    });
  }, [courses, filters, searchQuery]);

  const handleFilterChange = (group: string, value: string) => {
    setFilters((prev) => ({ ...prev, [group]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: "all", status: "all" });
    setSearchQuery("");
  };

  const labels: Record<string, Record<string, string>> = {
    category: {
      Technology: "Technology",
      AI: "AI",
      Design: "Design",
      Data: "Data",
    },
    status: {
      available: "Available",
      "coming-soon": "Coming Soon",
    },
  };

  const categoryOptions = useMemo(
    () => [
      { key: "all", label: "All", count: courses.length },
      ...ALL_CATEGORIES.map((cat) => ({
        key: cat,
        label: cat,
        count: categoryCount[cat],
      })),
    ],
    [courses.length, categoryCount],
  );

  const statusOptions = useMemo(
    () => [
      { key: "all", label: "All" },
      { key: "available", label: "Available" },
      { key: "coming-soon", label: "Coming Soon" },
    ],
    [],
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
              className="typo-label text-primary bg-none border-none cursor-pointer"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <input
            type="text"
            className="w-full px-3 py-2.5 border border-border rounded-[8px] bg-bg typo-body text-foreground leading-none outline-none transition-colors mb-4 sm:mb-5 placeholder:text-muted focus:border-primary"
            placeholder="Search courses..."
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
                activeClass={filters.category === key ? "text-primary" : ""}
              />
            ))}
          </div>

          <div className="mb-4 sm:mb-6 last:mb-0">
            <div className="typo-badge text-muted mb-2 sm:mb-3">Status</div>
            {statusOptions.map(({ key, label }) => (
              <FilterOption
                key={key}
                checked={filters.status === key}
                onChange={() => handleFilterChange("status", key)}
                label={label}
                activeClass={filters.status === key ? "text-primary" : ""}
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
                  className="inline-flex items-center gap-1.5 bg-primary-dim text-primary typo-badge py-1.5 px-2.5 rounded-full border-none cursor-pointer hover:bg-primary/20 transition-colors"
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
              {filteredCourses.length}
            </strong>{" "}
            course
            {filteredCourses.length !== 1 ? "s" : ""}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  tags={course.tags}
                  thumbnail={course.thumbnail}
                  href={course.comingSoon ? "#" : (course as any).href}
                  level={course.level}
                  comingSoon={course.comingSoon}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-8 sm:p-16">
                <strong className="typo-h3 text-foreground block mb-2">
                  ไม่พบคอร์ส
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
