import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToysContent } from "@/components/partials/Toys";

export default function ToysPage() {
  return (
    <>
      <Navbar />
      <ToysContent />
      <Footer />
    </>
  );
}
