"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ChevronRight, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/auth/AuthContext";
import { useLanguage } from "@/context/language/LanguageContext";

type Panel = "login" | "register";

/* ── Inline brand SVG icons ─────────────────────────────────── */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="white" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" />
  </svg>
);

const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

export default function CheckoutLoginContent() {
  const router = useRouter();
  const { login, register, loginWithSocial, loginAsGuest } = useAuth();
  const { t } = useLanguage();

  const [panel, setPanel]   = useState<Panel>("login");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error,   setError]   = useState("");
  const [showPw,  setShowPw]  = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw,    setLoginPw]    = useState("");

  const [regFirst, setRegFirst] = useState("");
  const [regLast,  setRegLast]  = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPw,    setRegPw]    = useState("");
  const [regPw2,   setRegPw2]   = useState("");

  const redirect = () => router.push("/cart");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(loginEmail, loginPw);
    setLoading(false);
    if (!res.ok) return setError(res.error ?? "Login failed.");
    redirect();
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPw !== regPw2) return setError("Passwords do not match.");
    setLoading(true);
    const res = await register(regFirst, regLast, regEmail, regPw);
    setLoading(false);
    if (!res.ok) return setError(res.error ?? "Registration failed.");
    redirect();
  };

  const handleSocial = async (provider: "facebook" | "google" | "line") => {
    setSocialLoading(provider);
    await loginWithSocial(provider);
    setSocialLoading(null);
    redirect();
  };

  const SOCIAL_BTNS = [
    { id: "facebook" as const, label: "Facebook", bg: "#1877F2", icon: <FacebookIcon /> },
    { id: "google"   as const, label: "Google",   bg: "#EA4335", icon: <GoogleIcon /> },
    { id: "line"     as const, label: "Line",      bg: "#06C755", icon: <LineIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-6 pb-10 px-4">

      {/* Logo */}
      <Link href="/" className="mb-6">
        <div className="flex items-center">
          <span className="text-2xl font-black text-brand-blue tracking-tight">WORLD</span>
          <span className="text-base font-bold text-gray-400 mx-1 leading-none self-end mb-0.5">of</span>
          <span className="text-2xl font-black text-brand-red tracking-tight">TOYS</span>
        </div>
      </Link>

      {/* Checkout steps */}
      <div className="flex items-center gap-2 mb-6 text-xs font-bold">
        <span className="flex items-center gap-1.5 bg-brand-red text-white px-3 py-1.5 rounded-full">
          <span className="w-4 h-4 bg-white text-brand-red rounded-full flex items-center justify-center text-[10px] font-black">1</span>
          {t.stepSignIn}
        </span>
        <ChevronRight size={13} className="text-gray-300" />
        <span className="flex items-center gap-1.5 text-gray-400 px-3 py-1.5 rounded-full border border-gray-300 bg-white">
          <span className="w-4 h-4 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-[10px] font-black">2</span>
          {t.stepPayment}
        </span>
        <ChevronRight size={13} className="text-gray-300" />
        <span className="flex items-center gap-1.5 text-gray-400 px-3 py-1.5 rounded-full border border-gray-300 bg-white">
          <span className="w-4 h-4 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-[10px] font-black">3</span>
          {t.stepConfirm}
        </span>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

        {/* Tab bar */}
        <div className="grid grid-cols-2 border-b border-gray-200">
          {(["login", "register"] as Panel[]).map((p) => (
            <button
              key={p}
              onClick={() => { setPanel(p); setError(""); }}
              className={`py-3.5 text-sm font-bold transition-colors ${
                panel === p
                  ? "bg-white text-brand-blue border-b-2 border-brand-blue"
                  : "bg-gray-50 text-gray-400 hover:text-gray-600"
              }`}
            >
              {p === "login" ? t.loginTab : t.registerTab}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          {/* ── LOGIN PANEL ── */}
          {panel === "login" && (
            <>
              {/* Social section */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-center" style={{ color: "#1a237e" }}>
                  {t.loginWith}
                </h2>
                <p className="text-xs text-gray-400 text-center">{t.loginSociallyDesc}</p>

                <div className="grid grid-cols-3 gap-2">
                  {SOCIAL_BTNS.map(({ id, label, bg, icon }) => (
                    <button
                      key={id}
                      onClick={() => handleSocial(id)}
                      disabled={!!socialLoading}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-70"
                      style={{ backgroundColor: bg }}
                    >
                      {socialLoading === id ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        icon
                      )}
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400 font-medium">{t.or}</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              {/* Email login form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-lg font-black text-center" style={{ color: "#1a237e" }}>
                  {t.loginToAccount}
                </h2>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    <span className="text-red-500">*</span> {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  <div className="text-right mt-1">
                    <button type="button" className="text-xs text-brand-blue hover:underline font-medium">
                      {t.loginWithMobile}
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    <span className="text-red-500">*</span> {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      placeholder={t.passwordPlaceholder}
                      value={loginPw}
                      onChange={(e) => setLoginPw(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 pr-10 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Remember me + forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" className="w-4 h-4 accent-brand-blue rounded" />
                    <span className="text-xs text-gray-600 font-medium">{t.rememberMe}</span>
                  </label>
                  <button type="button" className="text-xs text-brand-blue hover:underline font-medium">
                    {t.forgotPassword}
                  </button>
                </div>

                {/* Login button — orange */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg text-white font-black text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg, #f97316, #ef4444)" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.loginBtn}...
                    </span>
                  ) : t.loginBtn}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center">
                {t.dontHaveAccount}{" "}
                <button onClick={() => { setPanel("register"); setError(""); }} className="text-brand-blue font-bold hover:underline">
                  {t.registerTab}
                </button>
              </p>
            </>
          )}

          {/* ── REGISTER PANEL ── */}
          {panel === "register" && (
            <>
              {/* Social section */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-center" style={{ color: "#1a237e" }}>
                  {t.loginWith}
                </h2>
                <p className="text-xs text-gray-400 text-center">{t.loginSociallyDesc}</p>
                <div className="grid grid-cols-3 gap-2">
                  {SOCIAL_BTNS.map(({ id, label, bg, icon }) => (
                    <button
                      key={id}
                      onClick={() => handleSocial(id)}
                      disabled={!!socialLoading}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-70"
                      style={{ backgroundColor: bg }}
                    >
                      {socialLoading === id ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : icon}
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400 font-medium">{t.or}</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              <form onSubmit={handleRegister} className="space-y-3.5">
                <h2 className="text-lg font-black text-center" style={{ color: "#1a237e" }}>
                  {t.registerTab}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      <span className="text-red-500">*</span> {t.firstNameLabel}
                    </label>
                    <input type="text" required placeholder="Alex" value={regFirst} onChange={(e) => setRegFirst(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      <span className="text-red-500">*</span> {t.lastNameLabel}
                    </label>
                    <input type="text" required placeholder="Johnson" value={regLast} onChange={(e) => setRegLast(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    <span className="text-red-500">*</span> {t.emailLabel}
                  </label>
                  <input type="email" required placeholder={t.emailPlaceholder} value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    <span className="text-red-500">*</span> {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <input type={showPw2 ? "text" : "password"} required placeholder={t.passwordPlaceholder} value={regPw} onChange={(e) => setRegPw(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 pr-10 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                    <button type="button" onClick={() => setShowPw2(!showPw2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw2 ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    <span className="text-red-500">*</span> {t.confirmPasswordLabel}
                  </label>
                  <div className="relative">
                    <input type="password" required placeholder={t.confirmPasswordPlaceholder} value={regPw2} onChange={(e) => setRegPw2(e.target.value)}
                      className={`w-full border rounded-lg px-3.5 pr-10 py-2.5 text-sm focus:outline-none transition-colors ${
                        regPw2 && regPw !== regPw2 ? "border-red-300 focus:border-red-400" : "border-gray-300 focus:border-brand-blue"
                      }`} />
                    {regPw2 && regPw === regPw2 && (
                      <CheckCircle2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="w-4 h-4 mt-0.5 accent-brand-blue rounded" />
                  <span className="text-xs text-gray-500 leading-relaxed">{t.newsletterLabel}</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg text-white font-black text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg, #1565C0, #7B1FA2)" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.createAccountBtn}...
                    </span>
                  ) : t.createAccountBtn}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center">
                {t.alreadyHaveAccount}{" "}
                <button onClick={() => { setPanel("login"); setError(""); }} className="text-brand-red font-bold hover:underline">
                  {t.loginTab}
                </button>
              </p>
            </>
          )}

          {/* Guest checkout */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-100" />
            <span className="text-xs text-gray-300">{t.or}</span>
            <div className="flex-1 border-t border-gray-100" />
          </div>
          <button
            onClick={() => { loginAsGuest(); redirect(); }}
            className="w-full py-2.5 rounded-lg border-2 border-gray-200 text-gray-500 text-sm font-bold hover:border-gray-400 hover:text-gray-700 active:scale-[0.98] transition-all"
          >
            {t.continueAsGuest}
          </button>
          <p className="text-xs text-gray-400 text-center -mt-2">{t.guestNote}</p>
        </div>
      </div>

      {/* Security badges */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[
          { icon: ShieldCheck, label: "SSL Secured",         color: "text-green-500" },
          { icon: Lock,        label: "Data Encrypted",      color: "text-blue-500" },
          { icon: CheckCircle2,label: "Verified Payments",   color: "text-brand-red" },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Icon size={14} className={color} /> {label}
          </div>
        ))}
      </div>
    </div>
  );
}
