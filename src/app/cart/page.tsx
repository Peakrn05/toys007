import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartContent } from "@/components/partials/Cart";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartContent />
      <Footer />
    </>
  );
}
