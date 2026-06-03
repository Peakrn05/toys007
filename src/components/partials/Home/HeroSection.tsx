"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_BANNERS } from "./Home.config";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_BANNERS.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = HERO_BANNERS[current];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: banner.bgColor, minHeight: "480px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="text-white space-y-5 order-2 md:order-1">
            <span className="inline-block bg-brand-yellow text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              {banner.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-md">
              {banner.subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={banner.ctaLink}
                className="inline-block bg-white text-gray-900 font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                {banner.cta}
              </Link>
              <Link
                href="/deals"
                className="inline-block border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                View All Deals
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-sm md:max-w-md rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        aria-label="Previous banner"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        aria-label="Next banner"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
