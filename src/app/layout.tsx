import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/query/QueryProvider";
import { CartProvider } from "@/context/cart/CartContext";
import { WishlistProvider } from "@/context/wishlist/WishlistContext";

export const metadata: Metadata = {
  title: "ToysWorld - The Best Toy Store",
  description:
    "Discover thousands of toys, games, and educational products for children of all ages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <QueryProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
