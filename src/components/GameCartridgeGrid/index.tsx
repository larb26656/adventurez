import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Course, type GameCartridgeGridProps } from "./types";
import GameCartridge from "./GameCartridge";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

export default function GameCartridgeGrid({ courses }: GameCartridgeGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [courses, searchTerm]);

  const duplicatedCourses = useMemo(() => {
    const filtered = filteredCourses;
    if (!filtered || filtered.length === 0) {
      return [];
    }

    if (filtered.length < 5) {
      const copiesNeeded = 5 - filtered.length;
      return [
        ...filtered,
        ...Array(copiesNeeded)
          .fill(null)
          .map((_, i) => ({
            ...filtered[i % filtered.length],
            id: `${filtered[i % filtered.length].id}-dup-${i}`,
          })),
      ];
    }
    return filtered;
  }, [filteredCourses]);

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    if (swiperRef.current) {
      if (direction === "prev") {
        swiperRef.current.slidePrev();
      } else {
        swiperRef.current.slideNext();
      }
    }
  }, []);

  const handleEnter = useCallback(() => {
    const currentCourse = duplicatedCourses[activeIndex];
    if (currentCourse && !currentCourse.comingSoon) {
      window.location.href = currentCourse.href;
    }
  }, [activeIndex, duplicatedCourses]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleNavigate("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNavigate("next");
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigate, handleEnter]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:50px_50px] text-white flex flex-col items-center py-12 px-6">
      <header className="text-center mb-4">
        <img src="logo.png" width={"400px"}></img>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold">
          Your Journey to Mastery Starts Here.
        </p>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="w-full max-w-7xl relative">
        <Swiper
          className="mySwiper !pb-5"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 3 },
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={20}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {duplicatedCourses.map((course, index) => (
            <SwiperSlide key={`${course.id}-${index}`}>
              <div
                className={
                  index === activeIndex
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-60"
                }
              >
                <GameCartridge
                  course={course}
                  isActive={index === activeIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {filteredCourses.length > 0 && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex items-center justify-center !text-[var(--color-primary)] !bg-black/70 !w-12 !h-12 !rounded-full transition-transform active:scale-90 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="!w-6 !h-6" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex items-center justify-center !text-[var(--color-primary)] !bg-black/70 !w-12 !h-12 !rounded-full transition-transform active:scale-90 shadow-xl cursor-pointer"
            >
              <ChevronRight className="!w-6 !h-6" />
            </button>
          </>
        )}

        <div className="swiper-pagination !-bottom-2" />

        {filteredCourses.length > 0 && (
          <div className="hidden lg:flex justify-center gap-6 mt-4 text-[10px] text-gray-500 font-mono">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-[var(--color-primary)]">
                ←
              </kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-[var(--color-primary)]">
                →
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-[var(--color-primary)]">
                Enter
              </kbd>
              <span>Enter</span>
            </span>
          </div>
        )}
      </div>

      {filteredCourses.length === 0 && <EmptyState />}

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

      <style>{`
        .swiper-pagination-bullet { background: #555 !important; opacity: 1 !important; }
        .swiper-pagination-bullet-active { background: var(--color-primary) !important; }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 20px !important; }
      `}</style>
    </div>
  );
}

export type { Course };
