"use client";

import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";
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

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="product-card flex flex-col group">
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider ${BADGE_STYLES[product.badge]}`}
          >
            {BADGE_LABELS[product.badge]}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-2.5 right-10 bg-brand-orange text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full shadow flex items-center justify-center transition-all duration-150 hover:scale-110 ${
            wishlisted ? "bg-brand-red" : "bg-white"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            className={wishlisted ? "fill-white text-white" : "text-gray-400"}
          />
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="p-3.5 flex flex-col flex-1 gap-1.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
          {product.category}
        </p>

        <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-brand-yellow text-brand-yellow"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Cart button */}
        <button
          onClick={() => addToCart(product.id)}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-1.5 bg-brand-red text-white text-xs font-bold py-2 rounded-xl hover:bg-brand-red-dark active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed mt-0.5"
        >
          <ShoppingCart size={13} />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
