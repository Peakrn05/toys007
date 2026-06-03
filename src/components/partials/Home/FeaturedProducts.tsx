"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { FEATURED_PRODUCTS, AGE_FILTERS } from "./Home.config";
import type { Product } from "@/types/app/product";

const BADGE_STYLES: Record<NonNullable<Product["badge"]>, string> = {
  new: "bg-brand-blue text-white",
  sale: "bg-brand-red text-white",
  popular: "bg-brand-yellow text-gray-900",
};

const BADGE_LABELS: Record<NonNullable<Product["badge"]>, string> = {
  new: "NEW",
  sale: "SALE",
  popular: "HOT",
};

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="product-card group">
      {/* Image container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-md ${BADGE_STYLES[product.badge]}`}
          >
            {BADGE_LABELS[product.badge]}
          </span>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={wishlisted ? "fill-brand-red text-brand-red" : "text-gray-400"}
          />
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-brand-red font-medium uppercase tracking-wide">
          {product.category}
        </p>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-brand-yellow text-brand-yellow"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
         
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-brand-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          <ShoppingCart size={15} />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeAge, setActiveAge] = useState("all");

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="text-sm text-gray-500 mt-1">
              Top picks loved by kids and parents alike
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-brand-red border border-brand-red px-4 py-2 rounded-lg hover:bg-brand-red hover:text-white transition-colors self-start sm:self-auto"
          >
            View All Products
          </Link>
        </div>

        {/* Age filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {AGE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveAge(filter.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeAge === filter.value
                  ? "bg-brand-red text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
