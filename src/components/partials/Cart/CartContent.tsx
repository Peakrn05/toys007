"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowLeft,
  CreditCard, Wallet, Building2, CheckCircle2, ChevronRight,
  User, LogIn,
} from "lucide-react";
import { useCart } from "@/context/cart/CartContext";
import { useAuth } from "@/context/auth/AuthContext";
import { ALL_PRODUCTS } from "@/components/partials/Home/Home.config";

type PayMethod = "card" | "paypal" | "bank";

export default function CartContent() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();

  const [pay, setPay] = useState<PayMethod>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [done, setDone] = useState(false);

  const resolved = cartItems
    .map((item) => {
      const p = ALL_PRODUCTS.find((x) => x.id === item.productId);
      return p ? { ...p, qty: item.quantity } : null;
    })
    .filter(Boolean) as (typeof ALL_PRODUCTS[0] & { qty: number })[];

  const subtotal = resolved.reduce((s, p) => s + p.price * p.qty, 0);
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      router.push("/checkout-login");
      return;
    }
    clearCart();
    setDone(true);
  };

  /* ── Order success ── */
  if (done) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Order Confirmed!</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Thank you{user ? `, ${user.firstName}` : ""}! Your order is being processed and you will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium">
            Order #TW-{Date.now().toString().slice(-6)}
          </div>
          <Link href="/" className="btn-primary block text-center">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  /* ── Empty cart ── */
  if (resolved.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-black text-gray-700">Your cart is empty</h2>
          <p className="text-gray-400 text-sm">Add some toys to get started!</p>
          <Link href="/" className="btn-primary block text-center">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="p-2 text-gray-500 hover:text-gray-800 bg-white rounded-xl shadow-sm border border-gray-100 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500 font-medium">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: items ── */}
          <div className="lg:col-span-3 space-y-3">
            {resolved.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                    {item.category}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-base font-black text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-300 hover:text-brand-red transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2.5 py-1.5 border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="text-gray-500 hover:text-brand-red transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="text-sm font-black w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="text-gray-500 hover:text-brand-blue transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-gray-600">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: summary + payment ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Login status banner */}
            {!isLoggedIn ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <LogIn size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-amber-800">Sign in required to place order</p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    You&apos;ll be prompted to sign in or create an account at checkout.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <User size={16} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-green-800">
                    Signed in as {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[11px] text-green-600">{user?.email || "Guest checkout"}</p>
                </div>
                <CheckCircle2 size={16} className="text-green-500 ml-auto flex-shrink-0" />
              </div>
            )}

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-base font-black text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? "text-green-500" : ""}`}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%)</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2.5 flex justify-between font-black text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-brand-red">${total.toFixed(2)}</span>
                </div>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-brand-orange mt-3 font-medium">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-base font-black text-gray-900 mb-4">Payment Method</h2>

              {/* 3 tabs */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {([
                  { id: "card" as PayMethod, icon: CreditCard, label: "Card" },
                  { id: "paypal" as PayMethod, icon: Wallet, label: "PayPal" },
                  { id: "bank" as PayMethod, icon: Building2, label: "Bank" },
                ] as const).map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setPay(id)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      pay === id
                        ? "bg-brand-red text-white border-brand-red shadow-md"
                        : "bg-white text-gray-500 border-gray-200 hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Credit / Debit Card */}
              {pay === "card" && (
                <div className="space-y-3">
                  <div
                    className="rounded-2xl p-4 text-white text-sm mb-4 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1565C0 0%, #AA00FF 100%)" }}
                  >
                    <p className="text-xs opacity-70 mb-3">Credit / Debit Card</p>
                    <p className="font-mono text-base tracking-widest">
                      {card.number || "•••• •••• •••• ••••"}
                    </p>
                    <div className="flex justify-between mt-3 text-xs">
                      <span>{card.name || "CARDHOLDER NAME"}</span>
                      <span>{card.expiry || "MM/YY"}</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                  </div>
                  <input
                    type="text"
                    placeholder="Card number"
                    value={card.number}
                    maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setCard({ ...card, number: v.replace(/(.{4})/g, "$1 ").trim() });
                    }}
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue font-mono tracking-wider"
                  />
                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={card.expiry}
                      maxLength={5}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        setCard({ ...card, expiry: v });
                      }}
                      className="border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={card.cvv}
                      maxLength={3}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                      className="border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    {["visa", "mastercard", "amex"].map((b) => (
                      <span key={b} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-lg uppercase tracking-wider">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* PayPal */}
              {pay === "paypal" && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Wallet size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Pay with PayPal</p>
                    <p className="text-xs text-gray-400 mt-1">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 font-medium">
                    Buyer protection included on all orders
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {pay === "bank" && (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Bank Name</span>
                      <span className="font-bold text-gray-800">Bangkok Bank</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Account No.</span>
                      <span className="font-mono font-bold text-gray-800">123-4-56789-0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Account Name</span>
                      <span className="font-bold text-gray-800">ToysWorld Co., Ltd.</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="text-gray-500 font-bold">Amount to transfer</span>
                      <span className="font-black text-brand-red text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    After transfer, email your slip to{" "}
                    <span className="text-brand-blue font-semibold">orders@toysworld.com</span>
                  </p>
                </div>
              )}

              {/* Place order button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full flex items-center justify-center gap-2 mt-5 bg-brand-red text-white font-black py-3.5 rounded-xl hover:bg-brand-red-dark active:scale-95 transition-all shadow-sm text-sm"
              >
                {isLoggedIn ? (
                  <>Place Order <ChevronRight size={16} /></>
                ) : (
                  <>Sign In to Place Order <LogIn size={16} /></>
                )}
              </button>

              {!isLoggedIn && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  You will be redirected to sign in
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
