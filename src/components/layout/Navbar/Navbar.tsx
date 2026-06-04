"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";

const NAV_LINKS = [
  {
    label: "Toys",
    href: "/toys",
    children: ["Action Figures", "Dolls", "Building Blocks", "Plush Toys"],
  },
  {
    label: "Games",
    href: "/games",
    children: ["Board Games", "Card Games", "Puzzles", "Video Games"],
  },
  {
    label: "Outdoor",
    href: "/outdoor",
    children: ["Bikes", "Scooters", "Sports", "Water Toys"],
  },
  {
    label: "Learning",
    href: "/learning",
    children: ["STEM Kits", "Art & Craft", "Books", "Musical"],
  },
  { label: "Deals", href: "/deals", children: [] },
  { label: "Brands", href: "/brands", children: [] },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-brand-red text-white text-xs text-center py-2 px-4 font-medium">
        Free shipping on orders over $50 — Shop the latest arrivals now
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-0.5">
              <span className="text-2xl font-black text-brand-red tracking-tight">
                TOYS
              </span>
              <span className="text-2xl font-black text-brand-blue tracking-tight">
                WORLD
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for toys, games, brands..."
                className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-12 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-brand-red text-white rounded-r-xl hover:bg-brand-red-dark transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button className="hidden md:flex flex-col items-center p-2 text-gray-600 hover:text-brand-red transition-colors">
              <User size={20} />
              <span className="text-xs mt-0.5 font-medium">Account</span>
            </button>

            {/* Wishlist with badge */}
            <Link
              href="/wishlist"
              className="hidden md:flex flex-col items-center p-2 text-gray-600 hover:text-brand-pink transition-colors relative"
            >
              <div className="relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium">Wishlist</span>
            </Link>

            {/* Cart with badge */}
            <Link
              href="/cart"
              className="flex flex-col items-center p-2 text-gray-600 hover:text-brand-red transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium">Cart</span>
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="hidden md:block bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children.length > 0 && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors"
                >
                  {link.label}
                  {link.children.length > 0 && (
                    <ChevronDown size={14} className="opacity-70" />
                  )}
                </Link>

                {link.children.length > 0 && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-xl border border-gray-100 min-w-44 z-50">
                    <ul className="py-2">
                      {link.children.map((child) => (
                        <li key={child}>
                          <Link
                            href={`${link.href}/${child
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red transition-colors font-medium"
                          >
                            {child}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search toys..."
                className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-brand-red"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <ul className="py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
