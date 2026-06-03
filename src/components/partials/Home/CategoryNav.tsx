"use client";

import { useState, useRef } from "react";
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

const ICON_MAP: Record<IconName, React.ElementType> = {
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

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 240 : -240,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm font-medium text-brand-red hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:shadow-lg transition-shadow -ml-3"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>

          {/* Scrollable category list */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-2 pb-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Box;
              const isActive = activeCategory === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center gap-2.5 flex-shrink-0 w-20 group cursor-pointer`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${
                      isActive
                        ? "bg-brand-red text-white shadow-md"
                        : "bg-gray-50 text-gray-600 group-hover:bg-red-50 group-hover:text-brand-red"
                    }`}
                  >
                    <Icon size={26} />
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      isActive ? "text-brand-red" : "text-gray-600"
                    }`}
                  >
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:shadow-lg transition-shadow -mr-3"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
