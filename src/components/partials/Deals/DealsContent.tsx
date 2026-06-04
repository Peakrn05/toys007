"use client";

import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

const SALE_PRODUCTS = FEATURED_PRODUCTS.filter((p) => p.badge === "sale");

export default function DealsContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div
        className="py-14 px-4"
        style={{ background: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)" }}
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
              <Tag size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Today&apos;s Best Deals
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {SALE_PRODUCTS.length} items on sale — limited time only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {SALE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
