import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/query/QueryProvider";

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
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
