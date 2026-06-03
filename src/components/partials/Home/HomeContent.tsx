"use client";

import HeroSection from "./HeroSection";
import CategoryNav from "./CategoryNav";
import FeaturedProducts from "./FeaturedProducts";
import PromoBanner from "./PromoBanner";
import TrustBar from "./TrustBar";

export default function HomeContent() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <CategoryNav />
      <FeaturedProducts />
      <PromoBanner />
    </main>
  );
}
