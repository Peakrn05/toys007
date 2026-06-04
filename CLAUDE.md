# WORLDOFTOYS — Project Guide

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| State (server) | TanStack React Query v5 |
| Icons | lucide-react |
| Runtime | React 19 |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run type-check # tsc --noEmit
```

## Folder structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Homepage
    deals/page.tsx        # Sale items page
    outdoor/page.tsx      # Outdoor products page
    layout.tsx            # Root layout (QueryProvider > CartProvider > WishlistProvider)
    globals.css           # Tailwind base + brand utilities

  components/
    common/
      ProductCard/        # Shared card used by all product pages
    layout/
      Navbar/             # Sticky header — cart + wishlist badges
      Footer/             # Newsletter strip + link columns
    partials/
      Home/               # HeroSection, CategoryNav, FeaturedProducts, PromoBanner, TrustBar
      Deals/              # DealsContent — shows badge === "sale" products
      Outdoor/            # OutdoorContent — shows p8 (bike) + p3 (RC car)

  context/
    cart/CartContext.tsx       # cartCount + addToCart
    wishlist/WishlistContext.tsx  # wishlistCount + toggleWishlist + isWishlisted
    query/QueryProvider.tsx    # React Query client

  types/
    app/product/index.ts  # Product, Category, HeroBanner

  @/* alias maps to src/*
```

## Global contexts

- `CartContext` — increments `cartCount` on every "Add to Cart" click. Badge shows in Navbar.
- `WishlistContext` — `toggleWishlist(id)` adds/removes. `isWishlisted(id)` checks. Badge shows in Navbar next to Heart icon.

Both are wired through `layout.tsx` so they persist across all pages.

## Age filter logic (FeaturedProducts)

Defined in `Home.config.ts → AGE_EXCLUSIONS`:

| Filter | Excluded products |
|---|---|
| 0-2 years | p2 (Building Blocks), p4 (Science Kit), p8 (Outdoor Bike) |
| 3-5 years | p2 (Building Blocks) |
| 6-8 / 9-12 / 12+ / All | none |

## Brand colors (tailwind.config.ts)

| Token | Hex | Use |
|---|---|---|
| `brand-red` | `#FF1744` | Primary CTA, badges, active states |
| `brand-blue` | `#1565C0` | Nav bar, secondary |
| `brand-yellow` | `#FFD600` | Star ratings, HOT badge |
| `brand-orange` | `#FF6D00` | Discount badges, category labels |
| `brand-pink` | `#F50057` | Wishlist badge |
| `brand-green` | `#00C853` | Outdoor page gradient |
| `brand-purple` | `#AA00FF` | Hero gradient accent |

## Product data

All product data lives in `src/components/partials/Home/Home.config.ts`.
Product IDs are stable (`p1`–`p8`) — the age exclusion and page filter logic references them directly.

## Adding a new page

1. Create `src/app/<route>/page.tsx` — import Navbar, Footer, and a Content component.
2. Create `src/components/partials/<Feature>/` with `<Feature>Content.tsx` (use client) and `index.ts`.
3. Import `ProductCard` from `@/components/common/ProductCard` for any product grid.
