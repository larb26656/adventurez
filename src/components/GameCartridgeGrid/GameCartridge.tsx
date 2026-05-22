import { type GameCartridgeProps } from "./types";
import { isDark } from "./utils";

const GameCartridge = ({ course, isActive }: GameCartridgeProps) => {
  const darkTheme = isDark(course.color);
  const tagColor = darkTheme ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";

  const handleClick = () => {
    if (!course.comingSoon) {
      window.location.href = course.href;
    }
  };

  return (
    <div className="flex flex-col items-center group">
      <div
        onClick={handleClick}
        className={`relative w-full aspect-[1.4/1] rounded-xl flex flex-col p-1 cursor-pointer transition-all duration-300 shadow-[inset_3px_3px_0_rgba(255,255,255,0.3),inset_-3px_-3px_0_rgba(0,0,0,0.3),0_30px_60px_-12px_rgba(0,0,0,0.8)] ${
          course.comingSoon ? "opacity-70 cursor-not-allowed" : ""
        }`}
        style={{ backgroundColor: course.color }}
      >
        <div
          className="absolute top-[10px] left-[18px] text-[7px] italic font-black z-10 opacity-60 tracking-wider"
          style={{ color: tagColor }}
        >
          Luckytime
        </div>

        <div className="absolute top-[30%] left-[6%] right-[6%] h-[2px] bg-black/5 shadow-[0_4px_0_rgba(0,0,0,0.05),0_8px_0_rgba(0,0,0,0.05)] pointer-events-none" />

        <div className="h-[25%] relative flex justify-center items-end pb-1">
          <div className="w-[88%] h-[55%] bg-black/10 rounded-full shadow-inner flex items-center justify-center text-[10px] font-black text-black/30 tracking-[4px]">
            ADVENTUREZ BOY
          </div>
        </div>

        <div className="flex-1 mx-2 mb-1 bg-white border-2 border-black/80 rounded-[4px] overflow-hidden relative shadow-[inset_0_0_12px_rgba(0,0,0,0.4)]">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=GAME";
            }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2 md:p-3">
            <div className="text-white text-[10px] md:text-sm font-bold uppercase truncate shadow-black">
              {course.title}
            </div>
            <div className="text-gray-400 text-[7px] md:text-[8px] font-bold tracking-widest uppercase">
              {course.id}
            </div>
          </div> */}
          {course.comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-yellow-400 text-black text-[8px] md:text-[10px] font-black px-3 py-1 rotate-[-12deg] shadow-lg uppercase tracking-wider">
                Coming Soon
              </div>
            </div>
          )}
        </div>

        <div className="h-[12%] relative flex justify-center items-end pb-1">
          <div className="w-[70%] h-[5px] bg-[#111] rounded-sm flex justify-around px-2 shadow-md">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-[2px] h-full bg-gradient-to-b from-yellow-400 to-yellow-700 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mt-6 text-center transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        <div className="text-[var(--color-primary)] text-[10px] font-mono mb-1 tracking-tighter uppercase">
          {course.tags[0] || "ADVENTURE"}
        </div>
        <div className="text-white font-bold text-lg uppercase tracking-tight">
          {course.title}
        </div>
      </div>
    </div>
  );
};

export default GameCartridge;
