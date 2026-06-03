import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/query/QueryProvider";
import { CartProvider } from "@/context/cart/CartContext";

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
          <CartProvider>{children}</CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
