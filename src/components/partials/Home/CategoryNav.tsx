"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Shield,
  Star,
  Box,
  Grid3x3,
  Sun,
  Radio,
  Palette,
  FlaskConical,
  Puzzle,
  Heart,
  Music,
  Shirt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES } from "./Home.config";
import type { Category } from "@/types/app/product";

type IconName = Category["icon"];

const ICON_MAP: Record<string, React.ElementType> = {
  shield: Shield,
  star: Star,
  box: Box,
  grid: Grid3x3,
  sun: Sun,
  radio: Radio,
  paint: Palette,
  flask: FlaskConical,
  puzzle: Puzzle,
  heart: Heart,
  music: Music,
  shirt: Shirt,
};

// [defaultBg, iconColor, activeBg, activeText] — unique per icon key
const COLOR_MAP: Record<IconName, [string, string, string]> = {
  heart: ["bg-rose-100", "text-rose-500", "bg-rose-500"],
  box: ["bg-blue-100", "text-blue-500", "bg-blue-500"],
  star: ["bg-amber-100", "text-amber-500", "bg-amber-500"],
  music: ["bg-violet-100", "text-violet-500", "bg-violet-500"],
  paint: ["bg-fuchsia-100", "text-fuchsia-500", "bg-fuchsia-500"],
  shirt: ["bg-pink-100", "text-pink-500", "bg-pink-500"],
  radio: ["bg-red-100", "text-red-500", "bg-red-500"],
  grid: ["bg-purple-100", "text-purple-500", "bg-purple-500"],
  sun: ["bg-yellow-100", "text-yellow-500", "bg-yellow-500"],
  puzzle: ["bg-orange-100", "text-orange-500", "bg-orange-500"],
  flask: ["bg-cyan-100", "text-cyan-600", "bg-cyan-500"],
  shield: ["bg-green-100", "text-green-600", "bg-green-500"],
};

export default function CategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  };

  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-eyebrow">Browse</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link
            href="/"
            className="text-sm font-bold text-brand-red hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-8 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow -ml-4 border border-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-1 pb-2"
          >
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Box;
              const [defaultBg, iconColor, activeBg] =
                COLOR_MAP[cat.icon] ?? ["bg-gray-100", "text-gray-500", "bg-gray-500"];

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-2.5 flex-shrink-0 w-[72px] group"
                >
                  <div
                    className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${defaultBg} ${iconColor} group-hover:${activeBg} group-hover:text-white`}
                  >
                    <Icon size={26} />
                  </div>
                  <span className="text-[11px] font-semibold text-center leading-tight text-gray-700 group-hover:text-brand-red transition-colors">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-8 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow -mr-4 border border-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
