import { useState, useMemo } from "react";

import { type Course, type GameCartridgeGridProps } from "./types";
import GameCartridge from "./GameCartridge";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

export default function GameCartridgeGrid({ courses }: GameCartridgeGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [courses, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:50px_50px] text-white flex flex-col items-center py-12 px-6">
      <header className="text-center mb-4">
        <img src="logo.png" width={"400px"}></img>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold">
          Your Journey to Mastery Starts Here.
        </p>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="w-full max-w-7xl">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredCourses.map((course) => (
              <GameCartridge key={course.id} course={course} isActive={true} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <footer className="mt-auto pt-10 text-[9px] text-gray-700 uppercase tracking-widest font-bold flex flex-col items-center justify-center gap-4">
        <span>Built with ❤️ by luckytime1996</span>

        <a
          href="https://github.com/luckytime1996"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          <img src="icon/github.svg" className="size-5 invert brightness-0" />
        </a>
      </footer>
    </div>
  );
}

export type { Course };
