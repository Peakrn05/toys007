import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeContent } from "@/components/partials/Home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  );
}
