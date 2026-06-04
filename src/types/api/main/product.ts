// Shape returned by GET /api/products and GET /api/products/:id
// price/originalPrice/rating come back as strings from PostgreSQL numeric
export interface ApiProduct {
  id: string;
  name: string;
  price: string | number;
  originalPrice?: string | number | null;
  imageUrl: string;
  categoryId: string;
  badge?: string | null;
  rating: string | number;
  reviewCount: number;
  inStock: boolean;
  ageGroup: string;
  createdAt: string;
  updatedAt: string;
}
