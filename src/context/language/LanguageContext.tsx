"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "th" | "zh";

export interface T {
  // ── Navigation ─────────────────────────────────────────────
  navToys: string; navGames: string; navOutdoor: string;
  navLearning: string; navDeals: string; navBrands: string;
  navAccount: string; navWishlist: string; navCart: string;
  navSignIn: string; navSignOut: string; navMyAccount: string;
  navSearch: string;

  // ── Home ───────────────────────────────────────────────────
  shopByCategory: string; viewAll: string; ourCollection: string;
  allAges: string; age02: string; age35: string; age6Plus: string;
  addToCart: string; unavailable: string; viewAllDeals: string;
  outOfStock: string; productsAvailable: string;
  freeShippingBanner: string;

  // ── Trust bar ──────────────────────────────────────────────
  freeShipping: string; freeShippingDesc: string;
  easyReturns: string; easyReturnsDesc: string;
  securePayment: string; securePaymentDesc: string;
  support: string; supportDesc: string;

  // ── Login page ─────────────────────────────────────────────
  loginTab: string; registerTab: string;
  loginWith: string; loginSociallyDesc: string;
  loginToAccount: string;
  emailLabel: string; emailPlaceholder: string; loginWithMobile: string;
  passwordLabel: string; passwordPlaceholder: string;
  rememberMe: string; forgotPassword: string; loginBtn: string;
  or: string; continueAsGuest: string; guestNote: string;
  firstNameLabel: string; lastNameLabel: string;
  confirmPasswordLabel: string; confirmPasswordPlaceholder: string;
  newsletterLabel: string; createAccountBtn: string;
  alreadyHaveAccount: string; dontHaveAccount: string;
  signInRequired: string; signInRequiredDesc: string;
  signedInAs: string;
  stepSignIn: string; stepPayment: string; stepConfirm: string;
  secureCheckout: string;

  // ── Cart ───────────────────────────────────────────────────
  shoppingCart: string; itemsLabel: string;
  emptyCart: string; emptyCartDesc: string; browseProducts: string;
  orderSummary: string; subtotal: string; shippingLabel: string;
  taxLabel: string; total: string; freeLabel: string;
  placeOrder: string; signInToOrder: string;
  orderConfirmed: string; orderThankYou: string; continueShopping: string;
  paymentMethod: string;

  // ── Promo / footer ─────────────────────────────────────────
  shopByBrand: string; noProducts: string;
  limitedTime: string; newSeason: string;
  shopGames: string; shopOutdoor: string;
  newsletterHeading: string; newsletterSub: string; subscribeBtn: string;
}

const EN: T = {
  navToys: "Toys", navGames: "Games", navOutdoor: "Outdoor",
  navLearning: "Learning", navDeals: "Deals", navBrands: "Brands",
  navAccount: "Account", navWishlist: "Wishlist", navCart: "Cart",
  navSignIn: "Sign In", navSignOut: "Sign Out", navMyAccount: "My Account",
  navSearch: "Search for toys, games, brands...",

  shopByCategory: "Shop by Category", viewAll: "View all", ourCollection: "Our Collection",
  allAges: "All Ages", age02: "0-2 years", age35: "3-5 years", age6Plus: "6-8+ years",
  addToCart: "Add to Cart", unavailable: "Unavailable", viewAllDeals: "View All Deals",
  outOfStock: "Out of Stock", productsAvailable: "products available",
  freeShippingBanner: "Free shipping on orders over $50 — Shop the latest arrivals now",

  freeShipping: "Free Shipping", freeShippingDesc: "On all orders over $50",
  easyReturns: "Easy Returns", easyReturnsDesc: "30-day hassle-free returns",
  securePayment: "Secure Payment", securePaymentDesc: "100% safe transactions",
  support: "24/7 Support", supportDesc: "Dedicated customer service",

  loginTab: "login", registerTab: "register",
  loginWith: "login with...", loginSociallyDesc: "login socially for a faster checkout",
  loginToAccount: "login to my account",
  emailLabel: "login", emailPlaceholder: "email address", loginWithMobile: "login with mobile",
  passwordLabel: "password", passwordPlaceholder: "password",
  rememberMe: "remember me", forgotPassword: "forgot password?", loginBtn: "login",
  or: "or", continueAsGuest: "Continue as Guest",
  guestNote: "You will not be able to track your order as a guest",
  firstNameLabel: "First Name", lastNameLabel: "Last Name",
  confirmPasswordLabel: "Confirm Password", confirmPasswordPlaceholder: "Re-enter password",
  newsletterLabel: "Subscribe to our newsletter for exclusive deals and new arrivals",
  createAccountBtn: "Create Account",
  alreadyHaveAccount: "Already have an account?", dontHaveAccount: "Don't have an account?",
  signInRequired: "Sign in required to place order",
  signInRequiredDesc: "You will be prompted to sign in or create an account at checkout.",
  signedInAs: "Signed in as",
  stepSignIn: "Sign In", stepPayment: "Payment", stepConfirm: "Confirm",
  secureCheckout: "Secure Checkout",

  shoppingCart: "Shopping Cart", itemsLabel: "items",
  emptyCart: "Your cart is empty", emptyCartDesc: "Add some toys to get started!",
  browseProducts: "Browse Products", orderSummary: "Order Summary",
  subtotal: "Subtotal", shippingLabel: "Shipping", taxLabel: "Tax (7%)",
  total: "Total", freeLabel: "FREE",
  placeOrder: "Place Order", signInToOrder: "Sign In to Place Order",
  orderConfirmed: "Order Confirmed!", orderThankYou: "Thank you! Your order is being processed.",
  continueShopping: "Continue Shopping", paymentMethod: "Payment Method",

  shopByBrand: "Shop by Brand", noProducts: "No products in this category yet.",
  limitedTime: "Limited Time", newSeason: "New Season",
  shopGames: "Shop Games", shopOutdoor: "Shop Outdoor",
  newsletterHeading: "Get exclusive deals and new arrivals",
  newsletterSub: "Subscribe to our newsletter and save 10% on your first order.",
  subscribeBtn: "Subscribe",
};

const TH: T = {
  navToys: "ของเล่น", navGames: "เกม", navOutdoor: "กลางแจ้ง",
  navLearning: "การเรียนรู้", navDeals: "โปรโมชั่น", navBrands: "แบรนด์",
  navAccount: "บัญชี", navWishlist: "รายการโปรด", navCart: "ตะกร้า",
  navSignIn: "เข้าสู่ระบบ", navSignOut: "ออกจากระบบ", navMyAccount: "บัญชีของฉัน",
  navSearch: "ค้นหาของเล่น เกม แบรนด์...",

  shopByCategory: "ช้อปตามหมวดหมู่", viewAll: "ดูทั้งหมด", ourCollection: "คอลเลกชันของเรา",
  allAges: "ทุกช่วงวัย", age02: "0-2 ปี", age35: "3-5 ปี", age6Plus: "6 ปีขึ้นไป",
  addToCart: "เพิ่มในตะกร้า", unavailable: "ไม่พร้อมจำหน่าย", viewAllDeals: "ดูโปรโมชั่นทั้งหมด",
  outOfStock: "สินค้าหมด", productsAvailable: "สินค้าในหมวดหมู่นี้",
  freeShippingBanner: "ส่งฟรีเมื่อซื้อครบ $50 — ช้อปสินค้าใหม่ล่าสุดได้เลย",

  freeShipping: "จัดส่งฟรี", freeShippingDesc: "สำหรับคำสั่งซื้อเกิน $50",
  easyReturns: "คืนสินค้าง่าย", easyReturnsDesc: "คืนได้ภายใน 30 วัน",
  securePayment: "ชำระเงินปลอดภัย", securePaymentDesc: "ธุรกรรมปลอดภัย 100%",
  support: "บริการ 24/7", supportDesc: "ทีมบริการพร้อมช่วยเหลือ",

  loginTab: "เข้าสู่ระบบ", registerTab: "สมัครสมาชิก",
  loginWith: "เข้าสู่ระบบด้วย...", loginSociallyDesc: "เข้าสู่ระบบผ่านโซเชียลเพื่อชำระเงินเร็วขึ้น",
  loginToAccount: "เข้าสู่ระบบด้วยอีเมล",
  emailLabel: "อีเมล", emailPlaceholder: "ที่อยู่อีเมล", loginWithMobile: "เข้าสู่ระบบด้วยเบอร์โทร",
  passwordLabel: "รหัสผ่าน", passwordPlaceholder: "รหัสผ่าน",
  rememberMe: "จดจำฉัน", forgotPassword: "ลืมรหัสผ่าน?", loginBtn: "เข้าสู่ระบบ",
  or: "หรือ", continueAsGuest: "ดำเนินการในฐานะผู้เยี่ยมชม",
  guestNote: "คุณจะไม่สามารถติดตามคำสั่งซื้อในฐานะผู้เยี่ยมชม",
  firstNameLabel: "ชื่อ", lastNameLabel: "นามสกุล",
  confirmPasswordLabel: "ยืนยันรหัสผ่าน", confirmPasswordPlaceholder: "กรอกรหัสผ่านอีกครั้ง",
  newsletterLabel: "รับข่าวสารโปรโมชั่นและสินค้าใหม่",
  createAccountBtn: "สร้างบัญชี",
  alreadyHaveAccount: "มีบัญชีแล้ว?", dontHaveAccount: "ยังไม่มีบัญชี?",
  signInRequired: "ต้องเข้าสู่ระบบเพื่อสั่งซื้อ",
  signInRequiredDesc: "คุณจะถูกขอให้เข้าสู่ระบบหรือสร้างบัญชีในขั้นตอนชำระเงิน",
  signedInAs: "เข้าสู่ระบบในชื่อ",
  stepSignIn: "เข้าสู่ระบบ", stepPayment: "ชำระเงิน", stepConfirm: "ยืนยัน",
  secureCheckout: "ชำระเงินปลอดภัย",

  shoppingCart: "ตะกร้าสินค้า", itemsLabel: "รายการ",
  emptyCart: "ตะกร้าของคุณว่างเปล่า", emptyCartDesc: "เพิ่มของเล่นในตะกร้าเพื่อเริ่มต้น!",
  browseProducts: "ดูสินค้า", orderSummary: "สรุปคำสั่งซื้อ",
  subtotal: "ยอดรวมสินค้า", shippingLabel: "ค่าจัดส่ง", taxLabel: "ภาษี (7%)",
  total: "รวมทั้งหมด", freeLabel: "ฟรี",
  placeOrder: "สั่งซื้อ", signInToOrder: "เข้าสู่ระบบเพื่อสั่งซื้อ",
  orderConfirmed: "ยืนยันคำสั่งซื้อแล้ว!", orderThankYou: "ขอบคุณ! คำสั่งซื้อของคุณกำลังดำเนินการ",
  continueShopping: "ช้อปต่อ", paymentMethod: "วิธีการชำระเงิน",

  shopByBrand: "ช้อปตามแบรนด์", noProducts: "ยังไม่มีสินค้าในหมวดหมู่นี้",
  limitedTime: "เวลาจำกัด", newSeason: "ฤดูกาลใหม่",
  shopGames: "ช้อปเกม", shopOutdoor: "ช้อปของเล่นกลางแจ้ง",
  newsletterHeading: "รับดีลพิเศษและสินค้าใหม่",
  newsletterSub: "สมัครรับจดหมายข่าวและรับส่วนลด 10% สำหรับคำสั่งซื้อแรก",
  subscribeBtn: "สมัคร",
};

const ZH: T = {
  navToys: "玩具", navGames: "游戏", navOutdoor: "户外",
  navLearning: "学习教育", navDeals: "优惠活动", navBrands: "品牌",
  navAccount: "账户", navWishlist: "收藏夹", navCart: "购物车",
  navSignIn: "登录", navSignOut: "退出登录", navMyAccount: "我的账户",
  navSearch: "搜索玩具、游戏、品牌...",

  shopByCategory: "按类别购物", viewAll: "查看全部", ourCollection: "精选商品",
  allAges: "所有年龄", age02: "0-2岁", age35: "3-5岁", age6Plus: "6岁以上",
  addToCart: "加入购物车", unavailable: "暂无货", viewAllDeals: "查看全部优惠",
  outOfStock: "缺货", productsAvailable: "件商品",
  freeShippingBanner: "订单满$50免运费 — 立即购买最新商品",

  freeShipping: "免费配送", freeShippingDesc: "订单满$50免运费",
  easyReturns: "轻松退货", easyReturnsDesc: "30天无忧退货",
  securePayment: "安全支付", securePaymentDesc: "100%安全交易",
  support: "全天候服务", supportDesc: "专属客户服务团队",

  loginTab: "登录", registerTab: "注册",
  loginWith: "使用以下方式登录...", loginSociallyDesc: "通过社交账号快速结账",
  loginToAccount: "使用账号登录",
  emailLabel: "登录", emailPlaceholder: "邮箱地址", loginWithMobile: "手机号登录",
  passwordLabel: "密码", passwordPlaceholder: "请输入密码",
  rememberMe: "记住我", forgotPassword: "忘记密码？", loginBtn: "登录",
  or: "或", continueAsGuest: "以游客身份继续",
  guestNote: "以游客身份无法追踪订单",
  firstNameLabel: "名", lastNameLabel: "姓",
  confirmPasswordLabel: "确认密码", confirmPasswordPlaceholder: "再次输入密码",
  newsletterLabel: "订阅通讯，获取专属优惠和新品信息",
  createAccountBtn: "创建账户",
  alreadyHaveAccount: "已有账户？", dontHaveAccount: "没有账户？",
  signInRequired: "下单前请先登录",
  signInRequiredDesc: "结账时将提示您登录或创建账户",
  signedInAs: "已登录为",
  stepSignIn: "登录", stepPayment: "支付", stepConfirm: "确认",
  secureCheckout: "安全结账",

  shoppingCart: "购物车", itemsLabel: "件商品",
  emptyCart: "购物车是空的", emptyCartDesc: "快去挑选您喜欢的玩具吧！",
  browseProducts: "浏览商品", orderSummary: "订单摘要",
  subtotal: "小计", shippingLabel: "运费", taxLabel: "税费 (7%)",
  total: "总计", freeLabel: "免费",
  placeOrder: "提交订单", signInToOrder: "登录后下单",
  orderConfirmed: "订单已确认！", orderThankYou: "感谢您的购买！您的订单正在处理中。",
  continueShopping: "继续购物", paymentMethod: "支付方式",

  shopByBrand: "按品牌购物", noProducts: "该分类暂无商品",
  limitedTime: "限时优惠", newSeason: "新季上市",
  shopGames: "购买游戏", shopOutdoor: "购买户外玩具",
  newsletterHeading: "获取专属优惠和新品资讯",
  newsletterSub: "订阅通讯，首单立享九折优惠",
  subscribeBtn: "订阅",
};

export const TRANSLATIONS: Record<Language, T> = { en: EN, th: TH, zh: ZH };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("wot-lang") as Language | null;
    if (stored && ["en", "th", "zh"].includes(stored)) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("wot-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
