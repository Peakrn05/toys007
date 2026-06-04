import type { Product } from "@/types/app/product";
import type { ApiProduct } from "@/types/api/main/product";
import { getProductsApi, getProductByIdApi, type ProductQueryParams } from "@/lib/api/api-main";

/** Convert PostgreSQL numeric (returned as string) to JS number */
const num = (v: string | number | null | undefined): number =>
  v != null ? parseFloat(String(v)) : 0;

/** Map a raw API product → frontend Product, using a prebuilt category id→label map */
export function transformProduct(
  ap: ApiProduct,
  catMap: Map<string, string>
): Product {
  return {
    id: ap.id,
    name: ap.name,
    price: num(ap.price),
    originalPrice: ap.originalPrice ? num(ap.originalPrice) : undefined,
    image: ap.imageUrl,                                          // imageUrl → image
    category: catMap.get(ap.categoryId) ?? ap.categoryId,        // id → label
    badge: (ap.badge as Product["badge"]) ?? undefined,
    rating: num(ap.rating),
    reviewCount: ap.reviewCount ?? 0,
    inStock: ap.inStock ?? true,
    ageGroup: ap.ageGroup as Product["ageGroup"],
  };
}

export async function getProducts(
  params: ProductQueryParams | undefined,
  catMap: Map<string, string>
): Promise<Product[]> {
  const res = await getProductsApi(params);
  return res.data.map((p) => transformProduct(p, catMap));
}

export async function getProductById(
  id: string,
  catMap: Map<string, string>
): Promise<Product | null> {
  try {
    const res = await getProductByIdApi(id);
    return transformProduct(res.data, catMap);
  } catch {
    return null;
  }
}
