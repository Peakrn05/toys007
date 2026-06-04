"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, AGE_FILTERS } from "./Home.config";
import { ProductCard } from "@/components/common/ProductCard";

export default function FeaturedProducts() {
  const [activeAge, setActiveAge] = useState("all");

  const visible =
    activeAge === "all"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.ageGroup === activeAge);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-red font-bold text-sm uppercase tracking-widest mb-1">
              Our Collection
            </p>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              {activeAge === "all"
                ? "All Products"
                : activeAge === "0-2"
                ? "Toys for 0-2 Years"
                : activeAge === "3-5"
                ? "Toys for 3-5 Years"
                : "Toys for 6 Years & Up"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {visible.length} products available
            </p>
          </div>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-red px-5 py-2.5 rounded-xl hover:bg-brand-red-dark transition-colors self-start sm:self-auto shadow-sm"
          >
            View All Deals
          </Link>
        </div>

        {/* Age filter pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {AGE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveAge(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-150 ${
                activeAge === f.value
                  ? "bg-brand-red text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 text-sm font-medium">
            No products for this age group yet.
          </div>
        )}
      </div>
    </section>
  );
}
