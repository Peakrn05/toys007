"use client";

import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import {
  ALL_PRODUCTS,
  SLUG_TO_CATEGORY,
} from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

interface CategoryContentProps {
  slug: string;
}

export default function CategoryContent({ slug }: CategoryContentProps) {
  const categoryName = SLUG_TO_CATEGORY[slug] ?? slug.replace(/-/g, " ");

  const products = ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #1565C0 0%, #AA00FF 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="page-banner-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <Tag size={22} className="text-white" />
            </div>
            <div>
              <h1 className="page-banner-title capitalize">{categoryName}</h1>
              <p className="page-banner-subtitle">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} available
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 font-semibold text-lg mb-2">
              No products in this category yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 btn-primary"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
