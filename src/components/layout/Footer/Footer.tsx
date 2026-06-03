import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  "Shop By Category": [
    { label: "Action Figures", href: "/toys/action-figures" },
    { label: "Dolls & Playsets", href: "/toys/dolls" },
    { label: "Building & Construction", href: "/toys/building" },
    { label: "Board Games", href: "/games/board-games" },
    { label: "Outdoor & Sports", href: "/outdoor" },
    { label: "Learning & STEM", href: "/learning" },
  ],
  "Customer Service": [
    { label: "Track Your Order", href: "/orders/track" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Information", href: "/shipping" },
    { label: "Size Guides", href: "/size-guides" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  "About ToysWorld": [
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Affiliate Program", href: "/affiliates" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Store Locator", href: "/stores" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter strip */}
      <div className="bg-brand-red py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold">
                Get exclusive deals and new arrivals
              </h3>
              <p className="text-red-100 text-sm mt-1">
                Subscribe to our newsletter and save 10% on your first order.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-brand-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-blue-dark transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-brand-red tracking-tight">
                TOYS
              </span>
              <span className="text-2xl font-black text-white tracking-tight">
                WORLD
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The world&apos;s most trusted toy store. Bringing joy to children
              and families since 1990 with the best selection of toys, games,
              and educational products.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="text-brand-red flex-shrink-0" />
                <span>1-800-TOYS-WORLD</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="text-brand-red flex-shrink-0" />
                <span>support@toysworld.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>123 Toy Street, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ToysWorld, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
