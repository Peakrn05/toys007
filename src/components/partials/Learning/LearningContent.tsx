"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { ALL_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

const LEARN_CATS = ["STEM & Science", "Arts & Crafts", "Musical", "Wooden Toys"];
const products = ALL_PRODUCTS.filter((p) => LEARN_CATS.includes(p.category));

export default function LearningContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #00C853 0%, #1565C0 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="page-banner-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <FlaskConical size={22} className="text-white" />
            </div>
            <div>
              <h1 className="page-banner-title">Learning & Creativity</h1>
              <p className="page-banner-subtitle">
                {products.length} educational toys — STEM, arts, music & more
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
