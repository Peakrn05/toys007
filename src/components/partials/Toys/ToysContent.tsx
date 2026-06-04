"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ALL_PRODUCTS, AGE_FILTERS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

export default function ToysContent() {
  const [age, setAge] = useState("all");

  const products =
    age === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.ageGroup === age);

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="page-banner-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="page-banner-title">All Toys</h1>
          <p className="page-banner-subtitle">{ALL_PRODUCTS.length} products across all categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Age filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {AGE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setAge(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                age === f.value
                  ? "bg-brand-red text-white shadow-md"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
