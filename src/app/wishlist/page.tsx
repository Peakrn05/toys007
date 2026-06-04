import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WishlistContent } from "@/components/partials/Wishlist";

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <WishlistContent />
      <Footer />
    </>
  );
}
