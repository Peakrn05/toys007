"use client";

import { useState } from "react";
import Link from "next/link";
import { FEATURED_PRODUCTS, AGE_FILTERS, AGE_EXCLUSIONS } from "./Home.config";
import { ProductCard } from "@/components/common/ProductCard";

export default function FeaturedProducts() {
  const [activeAge, setActiveAge] = useState("all");

  const excluded = AGE_EXCLUSIONS[activeAge] ?? [];
  const visibleProducts = FEATURED_PRODUCTS.filter(
    (p) => !excluded.includes(p.id)
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Top picks loved by kids and parents alike
            </p>
          </div>
          <Link
            href="/deals"
            className="text-sm font-bold text-brand-red border-2 border-brand-red px-4 py-2 rounded-xl hover:bg-brand-red hover:text-white transition-colors self-start sm:self-auto"
          >
            View All Deals
          </Link>
        </div>

        {/* Age filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {AGE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveAge(filter.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-150 ${
                activeAge === filter.value
                  ? "bg-brand-red text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">
            No products available for this age group.
          </div>
        )}
      </div>
    </section>
  );
}
