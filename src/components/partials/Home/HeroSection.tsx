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
    setCurrent(
      (prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = HERO_BANNERS[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: banner.gradient, minHeight: "480px" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="text-white space-y-5 order-2 md:order-1">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
              Featured Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-sm">
              {banner.title}
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-md">
              {banner.subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={banner.ctaLink}
                className="inline-block bg-white text-gray-900 font-black px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow-lg"
              >
                {banner.cta}
              </Link>
              <Link
                href="/deals"
                className="inline-block border-2 border-white/70 text-white font-black px-8 py-3.5 rounded-xl hover:bg-white/15 transition-colors text-sm backdrop-blur-sm"
              >
                View All Deals
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-sm md:max-w-md rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
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

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm"
        aria-label="Previous banner"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm"
        aria-label="Next banner"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
