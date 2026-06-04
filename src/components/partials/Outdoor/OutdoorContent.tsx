"use client";

import Link from "next/link";
import { Sun, ArrowLeft } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

// Only the two products the store carries under Outdoor
const OUTDOOR_PRODUCT_IDS = ["p8", "p3"];
const OUTDOOR_PRODUCTS = FEATURED_PRODUCTS.filter((p) =>
  OUTDOOR_PRODUCT_IDS.includes(p.id)
);

export default function OutdoorContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div
        className="py-14 px-4"
        style={{ background: "linear-gradient(135deg, #00C853 0%, #1565C0 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sun size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Outdoor Collection
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {OUTDOOR_PRODUCTS.length} products available for outdoor adventures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {OUTDOOR_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
