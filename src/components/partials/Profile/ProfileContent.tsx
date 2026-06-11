"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Package, Heart, Settings, User,
  MapPin, Phone, Mail, Star, ChevronRight, Edit3, ShieldCheck,
  X, Truck, CheckCircle2, Circle, Mail as MailIcon, Smartphone,
} from "lucide-react";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { useAuth } from "@/context/auth/AuthContext";
import { getLoyaltyTier, getNextTier } from "@/lib/loyalty";
import { Switch, Card, CardContent, Button } from "@heroui/react";
import { ALL_PRODUCTS } from "@/components/partials/Home/Home.config";
import { ProductCard } from "@/components/common/ProductCard";

const MOCK_BASE = {
  phone: "+1 (555) 234-5678",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=faces",
  memberSince: "March 2023",
  loyaltyPoints: 2450,
  address: "123 Maple Street, Los Angeles, CA 90001",
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

const MOCK_REVIEWS = [
  {
    product: "LEGO Classic Creative Brick Box",
    rating: 5,
    date: "Dec 6, 2024",
    comment: "My kids absolutely love this set! Tons of pieces and the color variety sparks so much creativity.",
  },
  {
    product: "RC Turbo Racing Car Pro",
    rating: 4,
    date: "Nov 18, 2024",
    comment: "Fast and fun, though the battery life could be a bit longer. Great value overall.",
  },
  {
    product: "Science Explorer Lab Kit Pro",
    rating: 5,
    date: "Sep 22, 2024",
    comment: "Excellent educational toy — clear instructions and the experiments actually work!",
  },
];

const TRACKING_STEPS = [
  { label: "Order Placed", date: "Dec 1, 2024 · 9:14 AM", done: true },
  { label: "Processing", date: "Dec 1, 2024 · 2:30 PM", done: true },
  { label: "Shipped", date: "Dec 2, 2024 · 11:05 AM", done: true },
  { label: "Out for Delivery", date: "Dec 4, 2024 · 8:40 AM", done: true },
  { label: "Delivered", date: "Dec 4, 2024 · 3:52 PM", done: true },
];

type Tab = "profile" | "orders" | "wishlist" | "settings";
type ModalType = "track" | "reviews" | "verified" | "orderDetails" | null;

export default function ProfileContent() {
  const [tab, setTab] = useState<Tab>("profile");
  const [modal, setModal] = useState<ModalType>(null);
  const [activeOrder, setActiveOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [notifPrefs, setNotifPrefs] = useState({
    "Order updates": true,
    "Promotions & deals": true,
    "New arrivals": false,
    "Price drops": true,
  });

  // Single call — destructure everything needed
  const { wishlistCount, isWishlisted } = useWishlist();
  const { user: authUser, loyaltyPoints, orders } = useAuth();

  // Newly placed orders show first, followed by the mock order history
  const allOrders = [...orders, ...MOCK_ORDERS];

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
    loyaltyPoints: authUser ? loyaltyPoints : MOCK_BASE.loyaltyPoints,
    verified: authUser?.verified ?? true,
  };

  const currentTier = getLoyaltyTier(displayUser.loyaltyPoints);
  const nextTier = getNextTier(displayUser.loyaltyPoints);

  const openOrderDetails = (order: typeof MOCK_ORDERS[0]) => {
    setActiveOrder(order);
    setModal("orderDetails");
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "profile",  label: "My Profile",   icon: User },
    { id: "orders",   label: "Orders",        icon: Package, count: allOrders.length },
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
                <p className="text-2xl font-black">{allOrders.length}</p>
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
                style={{ background: currentTier.gradient }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">Loyalty Program</p>
                <p className="text-3xl font-black mt-2">
                  {displayUser.loyaltyPoints.toLocaleString()}
                  <span className="text-base font-semibold ml-1 text-white/70">pts</span>
                </p>
                <p className="text-sm text-white/80 mt-1">{currentTier.name}</p>
                {currentTier.bonusRate > 0 && (
                  <p className="text-xs text-white/70 mt-0.5">
                    +{currentTier.bonusRate * 100}% bonus points on every order
                  </p>
                )}
                {nextTier && (
                  <div className="mt-4 bg-white/20 rounded-xl p-3">
                    <div className="flex justify-between text-xs text-white/80 mb-1.5">
                      <span>Progress to {nextTier.name.replace(" Member", "")}</span>
                      <span>{displayUser.loyaltyPoints.toLocaleString()} / {nextTier.min.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${Math.min((displayUser.loyaltyPoints / nextTier.min) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {[
                  { icon: Package,    label: "Track Order",      sub: "Check your shipment status",   action: () => { setActiveOrder(MOCK_ORDERS[0]); setModal("track"); } },
                  { icon: Star,       label: "Reviews",           sub: "Products you have reviewed",   action: () => setModal("reviews") },
                  { icon: ShieldCheck,label: "Verified Account", sub: "ID verified successfully",     action: () => setModal("verified") },
                ].map(({ icon: Icon, label, sub, action }) => (
                  <button key={label} onClick={action} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left">
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
            {allOrders.map((order) => (
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
                <button onClick={() => openOrderDetails(order)} className="mt-3 text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
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
            <Card className="rounded-2xl border border-gray-100 shadow-sm">
              <CardContent className="p-6">
              <h2 className="font-black text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-3">
                {[
                  { label: "Order updates" as const,      sub: "Shipping & delivery alerts" },
                  { label: "Promotions & deals" as const, sub: "Weekly offers and discounts" },
                  { label: "New arrivals" as const,        sub: "Products matching your interests" },
                  { label: "Price drops" as const,         sub: "Wishlist item price changes" },
                ].map(({ label, sub }) => {
                  const on = notifPrefs[label];
                  return (
                    <div key={label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                      <Switch
                        isSelected={on}
                        onChange={(v: boolean) => setNotifPrefs((prev) => ({ ...prev, [label]: v }))}
                        aria-label={label}
                      />
                    </div>
                  );
                })}
              </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-100 shadow-sm">
              <CardContent className="p-6">
              <h2 className="font-black text-gray-900 mb-4">Security</h2>
              <div className="space-y-2">
                {[
                  { label: "Change Password",  sub: "Last changed 3 months ago",          icon: ShieldCheck },
                  { label: "Two-Factor Auth",  sub: "Enabled via Authenticator App",      icon: ShieldCheck },
                  { label: "Active Sessions",  sub: "1 active session on Windows",        icon: User },
                  { label: "Delete Account",   sub: "Permanently remove your account",    icon: User },
                ].map(({ label, sub, icon: Icon }) => (
                  <Button
                    key={label}
                    onPress={() => alert(`${label}: coming soon`)}
                    variant="ghost"
                    className="w-full flex items-center gap-3 py-2.5 h-auto justify-start rounded-xl px-2 text-left"
                  >
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Icon size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400 font-normal">{sub}</p>
                    </div>
                    <ChevronRight size={13} className="text-gray-300" />
                  </Button>
                ))}
              </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>

      {/* ── Modals ── */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Track order */}
            {modal === "track" && activeOrder && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-gray-900 text-lg">Track Order</h3>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-700">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 font-medium mb-5">#{activeOrder.id}</p>
                <div className="space-y-0">
                  {TRACKING_STEPS.map((step, i) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {step.done ? (
                          <CheckCircle2 size={20} className="text-brand-green" />
                        ) : (
                          <Circle size={20} className="text-gray-300" />
                        )}
                        {i < TRACKING_STEPS.length - 1 && (
                          <div className={`w-0.5 flex-1 min-h-[28px] ${step.done ? "bg-brand-green" : "bg-gray-200"}`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-bold text-gray-800">{step.label}</p>
                        <p className="text-xs text-gray-400">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                  <Truck size={18} className="text-brand-blue flex-shrink-0" />
                  <p className="text-xs text-blue-800 font-medium">
                    Delivered to {MOCK_BASE.address}
                  </p>
                </div>
              </div>
            )}

            {/* Reviews */}
            {modal === "reviews" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-gray-900 text-lg">My Reviews</h3>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-700">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((r) => (
                    <div key={r.product} className="border border-gray-100 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-800">{r.product}</p>
                      <div className="flex items-center gap-1 my-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < r.rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-200 fill-gray-200"}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">{r.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified account */}
            {modal === "verified" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-gray-900 text-lg">Account Verification</h3>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-700">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: MailIcon,    label: "Email Address",    value: displayUser.email,   verified: true },
                    { icon: Smartphone, label: "Phone Number",     value: displayUser.phone,    verified: true },
                    { icon: ShieldCheck,label: "Government ID",    value: "Verified on Mar 15, 2023", verified: displayUser.verified },
                  ].map(({ icon: Icon, label, value, verified }) => (
                    <div key={label} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
                      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{value}</p>
                      </div>
                      {verified ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 rounded-full px-2 py-1">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 rounded-full px-2 py-1">
                          Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order details */}
            {modal === "orderDetails" && activeOrder && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-gray-900 text-lg">Order Details</h3>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-700">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 font-medium mb-5">
                  #{activeOrder.id} · {activeOrder.date}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Items</p>
                  <ul className="space-y-1.5">
                    {activeOrder.items.map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <Package size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Shipping Address</p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    {MOCK_BASE.address}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Payment Method</p>
                  <p className="text-sm text-gray-700">Visa •••• 4242</p>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeOrder.statusColor}`}>
                    {activeOrder.status}
                  </span>
                  <p className="text-base font-black text-gray-900">${activeOrder.total.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
