"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart, Search, Menu, X, ChevronDown,
  User, Heart, LogOut, Settings,
} from "lucide-react";
import { useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { useAuth } from "@/context/auth/AuthContext";
import { useLanguage, type Language } from "@/context/language/LanguageContext";

const LANG_LABELS: Record<Language, string> = { en: "EN", th: "TH", zh: "中文" };

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [accountOpen,    setAccountOpen]    = useState(false);

  const { cartCount }     = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    {
      label: t.navToys, href: "/toys",
      children: [
        { label: "Action Figures",  href: "/category/action-figures" },
        { label: "Dolls",           href: "/category/dolls" },
        { label: "Building Blocks", href: "/category/building-blocks" },
        { label: "Plush Toys",      href: "/category/plush-toys" },
      ],
    },
    {
      label: t.navGames, href: "/games",
      children: [
        { label: "Board Games", href: "/category/board-games" },
        { label: "Puzzles",     href: "/category/puzzles" },
      ],
    },
    {
      label: t.navOutdoor, href: "/outdoor",
      children: [
        { label: "Bikes",          href: "/outdoor" },
        { label: "Remote Control", href: "/category/remote-control" },
        { label: "Water Toys",     href: "/outdoor" },
      ],
    },
    {
      label: t.navLearning, href: "/learning",
      children: [
        { label: "STEM & Science", href: "/category/stem-science" },
        { label: "Art & Craft",    href: "/category/arts-crafts" },
        { label: "Musical",        href: "/category/musical" },
      ],
    },
    { label: t.navDeals,  href: "/deals",  children: [] },
    { label: t.navBrands, href: "/brands", children: [] },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-brand-red text-white text-xs text-center py-2 px-4 font-medium">
        {t.freeShippingBanner}
      </div>

      {/* Main row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-xl font-black text-brand-blue tracking-tight">WORLD</span>
              <span className="text-sm font-bold text-gray-400 mx-1 leading-none self-end mb-0.5">of</span>
              <span className="text-xl font-black text-brand-red tracking-tight">TOYS</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.navSearch}
                className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-12 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-brand-red text-white rounded-r-xl hover:bg-brand-red-dark transition-colors">
                <Search size={17} />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* ── Language switcher ── */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1 gap-0.5 mr-1">
              {(["en", "th", "zh"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                    language === lang
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>

            {/* Account */}
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <Link
                href={isLoggedIn ? "/profile" : "/checkout-login"}
                className="flex flex-col items-center p-2 text-gray-600 hover:text-brand-red transition-colors"
              >
                {isLoggedIn ? (
                  <div className="w-7 h-7 bg-brand-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-black">
                      {user?.firstName?.[0]?.toUpperCase() ?? "U"}
                    </span>
                  </div>
                ) : (
                  <User size={20} />
                )}
                <span className="text-xs mt-0.5 font-medium max-w-[60px] truncate">
                  {isLoggedIn ? user?.firstName : t.navAccount}
                </span>
              </Link>

              {isLoggedIn && accountOpen && (
                <div className="absolute top-full right-0 bg-white shadow-lg rounded-xl border border-gray-100 min-w-44 z-50 py-2">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-black text-gray-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors font-medium">
                    <User size={14} /> {t.navMyAccount}
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors font-medium">
                    <Settings size={14} /> Settings
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
                      <LogOut size={14} /> {t.navSignOut}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden md:flex flex-col items-center p-2 text-gray-600 hover:text-brand-pink transition-colors relative">
              <div className="relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium">{t.navWishlist}</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex flex-col items-center p-2 text-gray-600 hover:text-brand-red transition-colors relative">
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium">{t.navCart}</span>
            </Link>

            {/* Mobile toggle */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
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
                onMouseEnter={() => link.children.length > 0 && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href} className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors">
                  {link.label}
                  {link.children.length > 0 && <ChevronDown size={14} className="opacity-70" />}
                </Link>

                {link.children.length > 0 && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-xl border border-gray-100 min-w-44 z-50">
                    <ul className="py-2">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red transition-colors font-medium">
                            {child.label}
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
          {/* Mobile search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <input type="text" placeholder={t.navSearch} className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-brand-red" />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile language switcher */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-2">Language</p>
            <div className="flex gap-2">
              {(["en", "th", "zh"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                    language === lang
                      ? "bg-brand-red text-white border-brand-red"
                      : "bg-white text-gray-500 border-gray-200"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          </div>

          <ul className="py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 mt-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-red" onClick={() => setMobileOpen(false)}>
                    {t.navMyAccount} ({user?.firstName})
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left block px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">
                    {t.navSignOut}
                  </button>
                </>
              ) : (
                <Link href="/checkout-login" className="block px-4 py-3 text-sm font-semibold text-brand-blue hover:bg-blue-50" onClick={() => setMobileOpen(false)}>
                  {t.navSignIn}
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
