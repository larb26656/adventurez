import { useState, useMemo } from "react";
import CourseCard from "./CourseCard";
import type { Course } from "../data/courses";

const TAG_TO_CATEGORY: Record<string, string> = {
  React: "webdev",
  Frontend: "webdev",
  JavaScript: "webdev",
  Docker: "backend",
  Kubernetes: "backend",
  "CI/CD": "backend",
  Jenkins: "backend",
  Github: "backend",
  Action: "backend",
  n8n: "ai",
  Automation: "ai",
  NoCode: "ai",
  Opencode: "ai",
  "AI-agent": "ai",
  LLM: "ai",
  script: "backend",
  Container: "backend",
};

function getCategory(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_TO_CATEGORY[tag]) return TAG_TO_CATEGORY[tag];
  }
  return "webdev";
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

  const categoryCount = useMemo(
    () => ({
      webdev: courses.filter((c) => getCategory(c.tags) === "webdev").length,
      ai: courses.filter((c) => getCategory(c.tags) === "ai").length,
      backend: courses.filter((c) => getCategory(c.tags) === "backend").length,
    }),
    [courses],
  );

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const category = getCategory(course.tags);
      const status = course.comingSoon ? "coming-soon" : "available";
      const title = course.title.toLowerCase();

      const matchCat =
        filters.category === "all" || category === filters.category;
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
      webdev: "Web Dev",
      ai: "AI / Automation",
      backend: "Backend / DevOps",
    },
    status: {
      available: "Available",
      "coming-soon": "Coming Soon",
    },
  };

  const activePills = Object.entries(filters)
    .filter(([key, value]) => value !== "all" && labels[key]?.[value])
    .map(([key, value]) => ({ key, value, label: labels[key][value] }));

  return (
    <div className="max-w-[1100px] mx-auto px-12 py-12">
      <div className="grid grid-cols-[240px_1fr] gap-8 items-start">
        <aside className="bg-surface border border-border rounded-[14px] p-6 sticky top-6">
          <div className="flex items-center justify-between mb-5 font-bold text-[14px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Filters
            <button className="text-[12px] text-primary bg-none border-none cursor-pointer font-semibold hover:underline" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <input
            type="text"
            className="w-full px-3 py-2.5 border border-border rounded-[8px] bg-bg text-foreground text-[14px] leading-none outline-none transition-colors mb-5 placeholder:text-muted focus:border-primary"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="mb-6 last:mb-0">
            <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted mb-3">Category</div>
            {[
              { key: "all", label: "All", count: courses.length },
              { key: "webdev", label: "Web Dev", count: categoryCount.webdev },
              { key: "ai", label: "AI / Automation", count: categoryCount.ai },
              {
                key: "backend",
                label: "Backend / DevOps",
                count: categoryCount.backend,
              },
            ].map(({ key, label, count }) => (
              <div
                key={key}
                className={`flex items-center gap-[10px] py-1.5 cursor-pointer text-[14px] leading-[1.3] text-foreground transition-colors ${filters.category === key ? "text-primary" : ""}`}
                onClick={() => handleFilterChange("category", key)}
              >
                <div className={`w-[18px] h-[18px] border rounded-[4px] bg-surface flex items-center justify-center shrink-0 transition-colors ${filters.category === key ? "border-primary bg-primary" : "border-border"}`}>
                  {filters.category === key && (
                    <svg viewBox="0 0 8 5" className="w-2 h-1.5">
                      <path d="M1 1L3.5 4L7 0" stroke="var(--color-primary-foreground)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>{label}</span>
                <span className="ml-auto text-[12px] text-muted">{count}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 last:mb-0">
            <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted mb-3">Status</div>
            {[
              { key: "all", label: "All" },
              { key: "available", label: "Available" },
              { key: "coming-soon", label: "Coming Soon" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className={`flex items-center gap-[10px] py-1.5 cursor-pointer text-[14px] leading-[1.3] text-foreground transition-colors ${filters.status === key ? "text-primary" : ""}`}
                onClick={() => handleFilterChange("status", key)}
              >
                <div className={`w-[18px] h-[18px] border rounded-[4px] bg-surface flex items-center justify-center shrink-0 transition-colors ${filters.status === key ? "border-primary bg-primary" : "border-border"}`}>
                  {filters.status === key && (
                    <svg viewBox="0 0 8 5" className="w-2 h-1.5">
                      <path d="M1 1L3.5 4L7 0" stroke="var(--color-primary-foreground)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <div>
          {activePills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activePills.map(({ key, value, label }) => (
                <button
                  key={`${key}-${value}`}
                  className="inline-flex items-center gap-1.5 bg-primary-dim text-primary text-[12px] font-semibold py-1.5 px-2.5 rounded-full border-none cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleFilterChange(key, "all")}
                >
                  {label} <span className="text-[14px] leading-none">×</span>
                </button>
              ))}
            </div>
          )}
          <div className="text-[13px] text-muted mb-5">
            Showing <strong className="text-foreground font-semibold">{filteredCourses.length}</strong> course
            {filteredCourses.length !== 1 ? "s" : ""}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  tags={course.tags}
                  thumbnail={course.thumbnail}
                  href={course.comingSoon ? "#" : (course as any).href}
                  level={course.comingSoon ? "Coming Soon" : "Available"}
                  duration={course.tags.slice(0, 2).join(" · ")}
                  comingSoon={course.comingSoon}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-16">
                <strong className="text-[18px] text-foreground font-semibold block mb-2">No courses found</strong>
                <span className="text-muted">Try adjusting your filters</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}