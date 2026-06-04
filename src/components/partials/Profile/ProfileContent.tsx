"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Package, Heart, Settings, User,
  MapPin, Phone, Mail, Star, ChevronRight, Edit3, ShieldCheck,
} from "lucide-react";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { useAuth } from "@/context/auth/AuthContext";
import { ALL_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

const MOCK_BASE = {
  phone: "+1 (555) 234-5678",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=faces",
  memberSince: "March 2023",
  loyaltyPoints: 2450,
  address: "123 Maple Street, Los Angeles, CA 90001",
  tier: "Gold Member",
};

const MOCK_ORDERS = [
  {
    id: "WOT-20241201",
    date: "Dec 1, 2024",
    total: 89.97,
    status: "Delivered",
    items: ["LEGO Classic Creative Brick Box", "Memory Matching Card Game"],
    statusColor: "text-green-600 bg-green-50",
  },
  {
    id: "WOT-20241115",
    date: "Nov 15, 2024",
    total: 44.99,
    status: "Delivered",
    items: ["RC Turbo Racing Car Pro"],
    statusColor: "text-green-600 bg-green-50",
  },
  {
    id: "WOT-20241003",
    date: "Oct 3, 2024",
    total: 129.99,
    status: "Delivered",
    items: ["20-inch Adventure Mountain Bike", "Magnetic Tile Building Set"],
    statusColor: "text-green-600 bg-green-50",
  },
  {
    id: "WOT-20240918",
    date: "Sep 18, 2024",
    total: 67.5,
    status: "Delivered",
    items: ["Science Explorer Lab Kit Pro", "Crystal Growing Kit", "Puzzle 500pcs"],
    statusColor: "text-green-600 bg-green-50",
  },
];

type Tab = "profile" | "orders" | "wishlist" | "settings";

export default function ProfileContent() {
  const [tab, setTab] = useState<Tab>("profile");

  // Single call — destructure everything needed
  const { wishlistCount, isWishlisted } = useWishlist();
  const { user: authUser } = useAuth();

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => isWishlisted(p.id));

  // Merge real auth data with mock fallback
  const displayUser = {
    name: authUser && !authUser.isGuest
      ? `${authUser.firstName} ${authUser.lastName}`.trim()
      : "Alex Johnson",
    email: authUser && !authUser.isGuest
      ? authUser.email
      : "alex.johnson@worldoftoys.com",
    ...MOCK_BASE,
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "profile",  label: "My Profile",   icon: User },
    { id: "orders",   label: "Orders",        icon: Package, count: MOCK_ORDERS.length },
    { id: "wishlist", label: "Wishlist",       icon: Heart,   count: wishlistCount },
    { id: "settings", label: "Settings",       icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Profile header */}
        <div
          className="rounded-3xl p-6 md:p-8 text-white mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1565C0 0%, #AA00FF 100%)" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayUser.avatar}
                alt={displayUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30"
              />
              <span className="absolute -bottom-1 -right-1 bg-brand-yellow text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                GOLD
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">{displayUser.name}</h1>
                <ShieldCheck size={18} className="text-yellow-300" />
              </div>
              <p className="text-white/70 text-sm">{displayUser.email}</p>
              <p className="text-white/70 text-xs mt-1">Member since {displayUser.memberSince}</p>
            </div>

            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-black">{MOCK_ORDERS.length}</p>
                <p className="text-xs text-white/70">Orders</p>
              </div>
              <div>
                <p className="text-2xl font-black">{displayUser.loyaltyPoints.toLocaleString()}</p>
                <p className="text-xs text-white/70">Points</p>
              </div>
              <div>
                <p className="text-2xl font-black">{wishlistCount}</p>
                <p className="text-xs text-white/70">Wishlist</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 right-16 w-24 h-24 bg-white/5 rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === id
                  ? "bg-brand-red text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              <Icon size={15} />
              {label}
              {count !== undefined && count > 0 && (
                <span className={`text-xs font-black rounded-full px-1.5 ${tab === id ? "bg-white/25" : "bg-gray-100 text-gray-600"}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Profile tab ── */}
        {tab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-black text-gray-900">Personal Information</h2>
                <button className="flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline">
                  <Edit3 size={13} /> Edit
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: User,   label: "Full Name", value: displayUser.name },
                  { icon: Mail,   label: "Email",     value: displayUser.email },
                  { icon: Phone,  label: "Phone",     value: displayUser.phone },
                  { icon: MapPin, label: "Address",   value: displayUser.address },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Loyalty card */}
              <div
                className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">Loyalty Program</p>
                <p className="text-3xl font-black mt-2">
                  {displayUser.loyaltyPoints.toLocaleString()}
                  <span className="text-base font-semibold ml-1 text-white/70">pts</span>
                </p>
                <p className="text-sm text-white/80 mt-1">{displayUser.tier}</p>
                <div className="mt-4 bg-white/20 rounded-xl p-3">
                  <div className="flex justify-between text-xs text-white/80 mb-1.5">
                    <span>Progress to Platinum</span>
                    <span>{displayUser.loyaltyPoints.toLocaleString()} / 5,000</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${Math.min((displayUser.loyaltyPoints / 5000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {[
                  { icon: Package,    label: "Track Order",      sub: "Check your shipment status" },
                  { icon: Star,       label: "Reviews",           sub: "Products you have reviewed" },
                  { icon: ShieldCheck,label: "Verified Account", sub: "ID verified successfully" },
                ].map(({ icon: Icon, label, sub }) => (
                  <button key={label} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left">
                    <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Orders tab ── */}
        {tab === "orders" && (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Package size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">#{order.id}</p>
                      <p className="text-xs text-gray-400 font-medium">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                    <p className="text-base font-black text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-500 font-medium">
                    Items: {order.items.join(" · ")}
                  </p>
                </div>
                <button className="mt-3 text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                  View details <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Wishlist tab ── */}
        {tab === "wishlist" && (
          <div>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-pink-300" />
                </div>
                <p className="text-gray-500 font-bold">No items in your wishlist yet</p>
                <p className="text-gray-400 text-sm mt-1">Tap the heart on any product to save it here</p>
                <Link href="/" className="btn-primary inline-flex mt-5 text-sm">
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── Settings tab ── */}
        {tab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-black text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-3">
                {[
                  { label: "Order updates",      sub: "Shipping & delivery alerts",          on: true },
                  { label: "Promotions & deals", sub: "Weekly offers and discounts",         on: true },
                  { label: "New arrivals",        sub: "Products matching your interests",   on: false },
                  { label: "Price drops",         sub: "Wishlist item price changes",        on: true },
                ].map(({ label, sub, on }) => (
                  <div key={label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${on ? "bg-brand-green" : "bg-gray-200"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "right-1" : "left-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-black text-gray-900 mb-4">Security</h2>
              <div className="space-y-3">
                {[
                  { label: "Change Password",  sub: "Last changed 3 months ago",          icon: ShieldCheck },
                  { label: "Two-Factor Auth",  sub: "Enabled via Authenticator App",      icon: ShieldCheck },
                  { label: "Active Sessions",  sub: "1 active session on Windows",        icon: User },
                  { label: "Delete Account",   sub: "Permanently remove your account",    icon: User },
                ].map(({ label, sub, icon: Icon }) => (
                  <button key={label} className="w-full flex items-center gap-3 py-2.5 hover:bg-gray-50 rounded-xl px-2 transition-colors text-left">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Icon size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                    <ChevronRight size={13} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
