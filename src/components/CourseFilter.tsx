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
    <div className="explore">
      <div className="explore-layout">
        <aside className="filter-panel">
          <div className="filter-title">
            Filters
            <button className="filter-reset" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <input
            type="text"
            className="filter-search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="filter-group">
            <div className="filter-group-label">Category</div>
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
                className={`filter-option ${filters.category === key ? "active" : ""}`}
                onClick={() => handleFilterChange("category", key)}
              >
                <div className="filter-checkbox" />
                <span>{label}</span>
                <span className="filter-count">{count}</span>
              </div>
            ))}
          </div>

          <div className="filter-group">
            <div className="filter-group-label">Status</div>
            {[
              { key: "all", label: "All" },
              { key: "available", label: "Available" },
              { key: "coming-soon", label: "Coming Soon" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className={`filter-option ${filters.status === key ? "active" : ""}`}
                onClick={() => handleFilterChange("status", key)}
              >
                <div className="filter-checkbox" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <div>
          {activePills.length > 0 && (
            <div className="active-filters">
              {activePills.map(({ key, value, label }) => (
                <button
                  key={`${key}-${value}`}
                  className="filter-pill"
                  onClick={() => handleFilterChange(key, "all")}
                >
                  {label} <span className="pill-x">×</span>
                </button>
              ))}
            </div>
          )}
          <div className="results-count">
            Showing <strong>{filteredCourses.length}</strong> course
            {filteredCourses.length !== 1 ? "s" : ""}
          </div>
          <div className="course-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  tag={course.tags[0] || "Adventure"}
                  thumbnail={course.thumbnail}
                  href={course.comingSoon ? "#" : course.href}
                  level={course.comingSoon ? "Coming Soon" : "Available"}
                  duration={course.tags.slice(0, 2).join(" · ")}
                  price={course.comingSoon ? "Soon" : "Free"}
                />
              ))
            ) : (
              <div className="no-results">
                <strong>No courses found</strong>Try adjusting your filters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}