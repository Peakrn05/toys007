import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GamesContent } from "@/components/partials/Games";

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <GamesContent />
      <Footer />
    </>
  );
}
