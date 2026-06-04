export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: "new" | "sale" | "popular";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  ageGroup: "0-2" | "3-5" | "6+";
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  icon: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  gradient: string;
  image: string;
}
