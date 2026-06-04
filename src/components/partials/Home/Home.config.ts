import type { Product, Category, HeroBanner } from "@/types/app/product";

export const HOME_STORAGE_KEY = "home-filters";

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: "1",
    title: "Summer Play Collection",
    subtitle: "Discover outdoor toys and water games for endless summer fun",
    cta: "Shop Now",
    ctaLink: "/outdoor",
    gradient: "linear-gradient(135deg, #1565C0 0%, #AA00FF 100%)",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800",
  },
  {
    id: "2",
    title: "New Arrivals Just In",
    subtitle: "The hottest toys of the season — be the first to get them",
    cta: "View New Arrivals",
    ctaLink: "/new-arrivals",
    gradient: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800",
  },
];

export const CATEGORIES: Category[] = [
  { id: "1", label: "Action Figures", slug: "action-figures", icon: "shield" },
  { id: "2", label: "Dolls", slug: "dolls", icon: "star" },
  { id: "3", label: "Building Blocks", slug: "building-blocks", icon: "box" },
  { id: "4", label: "Board Games", slug: "board-games", icon: "grid" },
  { id: "5", label: "Outdoor", slug: "outdoor", icon: "sun" },
  { id: "6", label: "Remote Control", slug: "remote-control", icon: "radio" },
  { id: "7", label: "Arts & Crafts", slug: "arts-crafts", icon: "paint" },
  { id: "8", label: "STEM & Science", slug: "stem-science", icon: "flask" },
  { id: "9", label: "Puzzles", slug: "puzzles", icon: "puzzle" },
  { id: "10", label: "Plush Toys", slug: "plush-toys", icon: "heart" },
  { id: "11", label: "Musical", slug: "musical", icon: "music" },
  { id: "12", label: "Dress Up", slug: "dress-up", icon: "shirt" },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Super Hero Action Set - Deluxe Edition",
    price: 29.99,
    originalPrice: 44.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviD_Yql9u-wkB5J_S5b2mui3IW_G9GLk73Q&s",
    category: "Action Figures",
    badge: "sale",
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
  },
  {
    id: "p2",
    name: "Classic Building Blocks 500 Piece Set",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
    category: "Building Blocks",
    badge: "popular",
    rating: 4.9,
    reviewCount: 1204,
    inStock: true,
  },
  {
    id: "p3",
    name: "Remote Control Racing Car Pro",
    price: 39.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400",
    category: "Remote Control",
    badge: "sale",
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
  },
  {
    id: "p4",
    name: "Science Explorer Lab Kit",
    price: 34.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOVvInoGAt28oZzuEOsGUBRACpPXWHAzV03w&s",
    category: "STEM & Science",
    badge: "new",
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
  },
  {
    id: "p5",
    name: "Family Strategy Board Game",
    price: 24.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdn6jKPY2y92zCclZhZfzH4EAmhTmdyIokQ&s",
    category: "Board Games",
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
  },
  {
    id: "p6",
    name: "Princess Doll Royal Castle Playset",
    price: 64.99,
    originalPrice: 79.99,
    image:
      "https://m.media-amazon.com/images/I/71ekP9r9onL._AC_UF894,1000_QL80_.jpg",
    category: "Dolls",
    badge: "sale",
    rating: 4.8,
    reviewCount: 423,
    inStock: true,
  },
  {
    id: "p7",
    name: "Giant 200-Piece Floor Puzzle",
    price: 19.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgOcfC_DdSRuKsXnXpKmTMMii81-MvSHu3w&s",
    category: "Puzzles",
    badge: "new",
    rating: 4.4,
    reviewCount: 77,
    inStock: true,
  },
  {
    id: "p8",
    name: "Outdoor Adventure Bike 20-inch",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://www.dysonbikes.com.au/assets/full/102720.jpg?20250313155239",
    category: "Outdoor",
    badge: "sale",
    rating: 4.7,
    reviewCount: 211,
    inStock: false,
  },
];

// Products excluded from each age filter (by product ID).
// "0-2": no Building Blocks, Science Kit, or Outdoor Bike (too advanced / physical risk)
// "3-5": no Building Blocks (small pieces)
export const AGE_EXCLUSIONS: Record<string, string[]> = {
  all: [],
  "0-2": ["p2", "p4", "p8"],
  "3-5": ["p2"],
  "6-8": [],
  "9-12": [],
  "12+": [],
};

export const AGE_FILTERS = [
  { label: "All Ages", value: "all" },
  { label: "0-2 years", value: "0-2" },
  { label: "3-5 years", value: "3-5" },
  { label: "6-8 years", value: "6-8" },
  { label: "9-12 years", value: "9-12" },
  { label: "12+ years", value: "12+" },
];

export const BRAND_FEATURES = [
  {
    title: "Free Shipping",
    description: "On all orders over $50",
    icon: "truck",
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    icon: "refresh",
  },
  {
    title: "Secure Payment",
    description: "100% safe transactions",
    icon: "lock",
  },
  {
    title: "24/7 Support",
    description: "Dedicated customer service",
    icon: "headphones",
  },
];
