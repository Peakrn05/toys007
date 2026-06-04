import type { Product, Category, HeroBanner } from "@/types/app/product";

export const HOME_STORAGE_KEY = "home-filters";

// ─── Hero Banners ─────────────────────────────────────────────────────────────

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: "1",
    title: "Summer Play Collection",
    subtitle: "Outdoor toys and water games for endless summer fun",
    cta: "Shop Outdoor",
    ctaLink: "/outdoor",
    gradient: "linear-gradient(135deg, #1565C0 0%, #AA00FF 100%)",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80&fit=crop",
  },
  {
    id: "2",
    title: "New Arrivals Just In",
    subtitle: "The hottest toys of the season — be the first to get them",
    cta: "View All Deals",
    ctaLink: "/deals",
    gradient: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80&fit=crop",
  },
];

// ─── Category Nav ─────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "1", label: "Plush Toys", slug: "plush-toys", icon: "heart" },
  { id: "2", label: "Wooden Toys", slug: "wooden-toys", icon: "box" },
  { id: "3", label: "Baby Toys", slug: "baby-toys", icon: "star" },
  { id: "4", label: "Musical", slug: "musical", icon: "music" },
  { id: "5", label: "Arts & Crafts", slug: "arts-crafts", icon: "paint" },
  { id: "6", label: "Dress Up", slug: "dress-up", icon: "shirt" },
  { id: "7", label: "Vehicles", slug: "vehicles", icon: "radio" },
  { id: "8", label: "Board Games", slug: "board-games", icon: "grid" },
  { id: "9", label: "Outdoor", slug: "outdoor", icon: "sun" },
  { id: "10", label: "Puzzles", slug: "puzzles", icon: "puzzle" },
  { id: "11", label: "Building Blocks", slug: "building-blocks", icon: "box" },
  { id: "12", label: "STEM & Science", slug: "stem-science", icon: "flask" },
  { id: "13", label: "Remote Control", slug: "remote-control", icon: "radio" },
  { id: "14", label: "Action Figures", slug: "action-figures", icon: "shield" },
  { id: "15", label: "Dolls", slug: "dolls", icon: "star" },
];

// Slug → display label (used by category page)
export const SLUG_TO_CATEGORY: Record<string, string> = {
  "plush-toys": "Plush Toys",
  "wooden-toys": "Wooden Toys",
  "baby-toys": "Baby Toys",
  "musical": "Musical",
  "arts-crafts": "Arts & Crafts",
  "dress-up": "Dress Up",
  "vehicles": "Vehicles",
  "board-games": "Board Games",
  "outdoor": "Outdoor",
  "puzzles": "Puzzles",
  "building-blocks": "Building Blocks",
  "stem-science": "STEM & Science",
  "remote-control": "Remote Control",
  "action-figures": "Action Figures",
  "dolls": "Dolls",
};

// ─── All Products (42) ────────────────────────────────────────────────────────
// Images: Unsplash only — all URLs confirmed working.

export const ALL_PRODUCTS: Product[] = [
  // ── 0-2 years (12 products) ──────────────────────────────────────────────

  {
    id: "p1",
    name: "Soft Rainbow Stacking Rings",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Baby Toys",
    badge: "popular",
    rating: 4.9,
    reviewCount: 1842,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p2",
    name: "Baby Plush Teddy Bear 30cm",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1560265637-c726a318d39e?w=400&q=80&fit=crop",
    category: "Plush Toys",
    badge: "popular",
    rating: 4.8,
    reviewCount: 2310,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p3",
    name: "Squeeze & Float Bath Toy Set",
    price: 14.99,
    originalPrice: 19.99,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80&fit=crop",
    category: "Baby Toys",
    badge: "sale",
    rating: 4.7,
    reviewCount: 983,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p4",
    name: "Baby Activity Gym & Play Mat",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&fit=crop",
    category: "Baby Toys",
    badge: "new",
    rating: 4.8,
    reviewCount: 547,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p5",
    name: "Musical Crib Mobile Stars",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Musical",
    badge: "new",
    rating: 4.6,
    reviewCount: 412,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p6",
    name: "Wooden Shape Sorter Box",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80&fit=crop",
    category: "Wooden Toys",
    rating: 4.7,
    reviewCount: 728,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p7",
    name: "Soft Fabric Sensory Activity Book",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&fit=crop",
    category: "Baby Toys",
    rating: 4.5,
    reviewCount: 654,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p8",
    name: "Baby Sensory Crinkle Rattle Set",
    price: 11.99,
    originalPrice: 16.99,
    image:
      "https://images.unsplash.com/photo-1560265637-c726a318d39e?w=400&q=80&fit=crop",
    category: "Baby Toys",
    badge: "sale",
    rating: 4.6,
    reviewCount: 331,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p9",
    name: "Giraffe Rattle & Teether Toy",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Baby Toys",
    rating: 4.7,
    reviewCount: 1104,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p10",
    name: "Classic Pull-Along Wooden Duck",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80&fit=crop",
    category: "Wooden Toys",
    badge: "popular",
    rating: 4.8,
    reviewCount: 877,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p11",
    name: "Baby Piano Play Mat Musical",
    price: 34.99,
    originalPrice: 44.99,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80&fit=crop",
    category: "Musical",
    badge: "sale",
    rating: 4.7,
    reviewCount: 623,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "p12",
    name: "Soft Silicone Stacking Cups 6pcs",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Baby Toys",
    rating: 4.5,
    reviewCount: 289,
    inStock: true,
    ageGroup: "0-2",
  },

  // ── 3-5 years (15 products) ──────────────────────────────────────────────

  {
    id: "p13",
    name: "Deluxe Play Kitchen Set",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Dolls",
    badge: "sale",
    rating: 4.8,
    reviewCount: 1253,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p14",
    name: "Washable Finger Paint Set 12 Colors",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1461702057336-969e35b85f07?w=400&q=80&fit=crop",
    category: "Arts & Crafts",
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p15",
    name: "Princess Fairy Dress-Up Kit",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7571?w=400&q=80&fit=crop",
    category: "Dress Up",
    badge: "popular",
    rating: 4.7,
    reviewCount: 1045,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p16",
    name: "Wooden Train Track Set 40pcs",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80&fit=crop",
    category: "Wooden Toys",
    badge: "popular",
    rating: 4.9,
    reviewCount: 2087,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p17",
    name: "Memory Matching Card Game",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&q=80&fit=crop",
    category: "Board Games",
    rating: 4.5,
    reviewCount: 743,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p18",
    name: "Kids Art & Craft Activity Box",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1461702057336-969e35b85f07?w=400&q=80&fit=crop",
    category: "Arts & Crafts",
    badge: "sale",
    rating: 4.7,
    reviewCount: 631,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p19",
    name: "24-Piece Foam Floor Puzzle Animals",
    price: 17.99,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?w=400&q=80&fit=crop",
    category: "Puzzles",
    badge: "new",
    rating: 4.6,
    reviewCount: 418,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p20",
    name: "Sand & Water Outdoor Play Table",
    price: 54.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80&fit=crop",
    category: "Outdoor",
    badge: "sale",
    rating: 4.8,
    reviewCount: 912,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p21",
    name: "Jumbo Bubble Gun & Solution Set",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80&fit=crop",
    category: "Outdoor",
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p22",
    name: "Multi-Level Toy Vehicle Garage",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80&fit=crop",
    category: "Vehicles",
    badge: "popular",
    rating: 4.7,
    reviewCount: 784,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p23",
    name: "Doctor & Nurse Role-Play Kit",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Dolls",
    rating: 4.5,
    reviewCount: 489,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p24",
    name: "Dinosaur World Figurine 12-Pack",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80&fit=crop",
    category: "Action Figures",
    badge: "popular",
    rating: 4.8,
    reviewCount: 1563,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p25",
    name: "Classic Farm Animals Playset",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&fit=crop",
    category: "Dolls",
    rating: 4.6,
    reviewCount: 349,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p26",
    name: "Kids Mini Drum Kit Set",
    price: 44.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Musical",
    badge: "sale",
    rating: 4.7,
    reviewCount: 527,
    inStock: true,
    ageGroup: "3-5",
  },
  {
    id: "p27",
    name: "Pretend Store Cash Register",
    price: 27.99,
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80&fit=crop",
    category: "Dolls",
    rating: 4.5,
    reviewCount: 398,
    inStock: true,
    ageGroup: "3-5",
  },

  // ── 6+ years (15 products) ───────────────────────────────────────────────

  {
    id: "p28",
    name: "LEGO Classic Creative Brick Box",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400&q=80&fit=crop",
    category: "Building Blocks",
    badge: "popular",
    rating: 4.9,
    reviewCount: 4821,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p29",
    name: "RC Turbo Racing Car Pro",
    price: 39.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80&fit=crop",
    category: "Remote Control",
    badge: "sale",
    rating: 4.6,
    reviewCount: 1189,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p30",
    name: "Science Explorer Lab Kit Pro",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1532094349884-543559fee4b6?w=400&q=80&fit=crop",
    category: "STEM & Science",
    badge: "new",
    rating: 4.7,
    reviewCount: 698,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p31",
    name: "Monopoly Junior Family Edition",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&q=80&fit=crop",
    category: "Board Games",
    rating: 4.5,
    reviewCount: 2134,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p32",
    name: "20-inch Adventure Mountain Bike",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80&fit=crop",
    category: "Outdoor",
    badge: "sale",
    rating: 4.7,
    reviewCount: 811,
    inStock: false,
    ageGroup: "6+",
  },
  {
    id: "p33",
    name: "Magnetic Tile Building Set 100pcs",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80&fit=crop",
    category: "Building Blocks",
    badge: "new",
    rating: 4.8,
    reviewCount: 943,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p34",
    name: "Premium Watercolor Art Studio Set",
    price: 27.99,
    image:
      "https://images.unsplash.com/photo-1461702057336-969e35b85f07?w=400&q=80&fit=crop",
    category: "Arts & Crafts",
    rating: 4.6,
    reviewCount: 567,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p35",
    name: "RC Stunt Helicopter 2.4GHz",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80&fit=crop",
    category: "Remote Control",
    badge: "new",
    rating: 4.5,
    reviewCount: 432,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p36",
    name: "Long-Range Kids Walkie-Talkie Set",
    price: 19.99,
    originalPrice: 29.99,
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80&fit=crop",
    category: "Remote Control",
    badge: "sale",
    rating: 4.4,
    reviewCount: 378,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p37",
    name: "Solar System Planetarium Kit",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1532094349884-543559fee4b6?w=400&q=80&fit=crop",
    category: "STEM & Science",
    badge: "new",
    rating: 4.8,
    reviewCount: 521,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p38",
    name: "Coding Robot for Kids Scratch",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400&q=80&fit=crop",
    category: "STEM & Science",
    badge: "new",
    rating: 4.7,
    reviewCount: 287,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p39",
    name: "Table Tennis Ping-Pong Set",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
    category: "Outdoor",
    rating: 4.5,
    reviewCount: 413,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p40",
    name: "500-Piece Nature Jigsaw Puzzle",
    price: 21.99,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?w=400&q=80&fit=crop",
    category: "Puzzles",
    rating: 4.6,
    reviewCount: 889,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p41",
    name: "Crystal Growing Science Lab Kit",
    price: 18.99,
    originalPrice: 26.99,
    image:
      "https://images.unsplash.com/photo-1532094349884-543559fee4b6?w=400&q=80&fit=crop",
    category: "STEM & Science",
    badge: "sale",
    rating: 4.7,
    reviewCount: 634,
    inStock: true,
    ageGroup: "6+",
  },
  {
    id: "p42",
    name: "Classic Chess & Checkers Combo Set",
    price: 22.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&q=80&fit=crop",
    category: "Board Games",
    badge: "sale",
    rating: 4.8,
    reviewCount: 1122,
    inStock: true,
    ageGroup: "6+",
  },
];

// Keep FEATURED_PRODUCTS as alias for backward compatibility
export const FEATURED_PRODUCTS = ALL_PRODUCTS;

// ─── Age Filters ──────────────────────────────────────────────────────────────
// 9-12 and 12+ removed; 6-8 changed to 6-8+

export const AGE_FILTERS = [
  { label: "All Ages", value: "all" },
  { label: "0-2 years", value: "0-2" },
  { label: "3-5 years", value: "3-5" },
  { label: "6-8+ years", value: "6+" },
];

// ─── Trust Bar ────────────────────────────────────────────────────────────────

export const BRAND_FEATURES = [
  {
    title: "Free Shipping",
    description: "On all orders over $50",
    icon: "truck",
    color: "blue",
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    icon: "refresh",
    color: "green",
  },
  {
    title: "Secure Payment",
    description: "100% safe transactions",
    icon: "lock",
    color: "purple",
  },
  {
    title: "24/7 Support",
    description: "Dedicated customer service",
    icon: "headphones",
    color: "orange",
  },
];
