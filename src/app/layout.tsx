import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/query/QueryProvider";
import { CartProvider } from "@/context/cart/CartContext";
import { WishlistProvider } from "@/context/wishlist/WishlistContext";
import { AuthProvider } from "@/context/auth/AuthContext";
import { LanguageProvider } from "@/context/language/LanguageContext";

export const metadata: Metadata = {
  title: "WORLDOFTOYS - The Best Toy Store",
  description:
    "Discover thousands of toys, games, and educational products for children of all ages.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <LanguageProvider>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
