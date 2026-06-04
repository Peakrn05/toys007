"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { ALL_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

export default function WishlistContent() {
  const { isWishlisted, wishlistCount } = useWishlist();
  const items = ALL_PRODUCTS.filter((p) => isWishlisted(p.id));

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #F50057 0%, #FF6D00 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="page-banner-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart size={22} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="page-banner-title">My Wishlist</h1>
              <p className="page-banner-subtitle">
                {wishlistCount} saved item{wishlistCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
              <Heart size={36} className="text-pink-200" />
            </div>
            <h2 className="text-xl font-black text-gray-700">No saved items yet</h2>
            <p className="text-gray-400 text-sm">
              Tap the heart icon on any product to save it here.
            </p>
            <Link href="/" className="btn-primary inline-flex mt-2">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
