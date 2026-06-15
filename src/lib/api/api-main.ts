import { apiClient } from "./client";
import type { ApiProduct } from "@/types/api/main/product";
import type { ApiCategory } from "@/types/api/main/category";
import type { ApiBrand } from "@/types/api/main/brand";
import type { ApiHeroBanner } from "@/types/api/main/banner";

export interface ProductQueryParams {
  ageGroup?: string;
  badge?: string;
  category?: string;
  search?: string;
  inStock?: string;
}

// ── Products ──────────────────────────────────────────────────────────────────
export const getProductsApi = (params?: ProductQueryParams) =>
  apiClient.get<ApiProduct[]>("/products", { params });

export const getProductByIdApi = (id: string) =>
  apiClient.get<ApiProduct>(`/products/${id}`);

// ── Categories ────────────────────────────────────────────────────────────────
export const getCategoriesApi = () =>
  apiClient.get<ApiCategory[]>("/categories");

export const getCategoryProductsApi = (slug: string) =>
  apiClient.get<ApiProduct[]>(`/categories/${slug}/products`);

// ── Brands ────────────────────────────────────────────────────────────────────
export const getBrandsApi = () =>
  apiClient.get<ApiBrand[]>("/brands");

// ── Hero Banners ──────────────────────────────────────────────────────────────
export const getHeroBannersApi = () =>
  apiClient.get<ApiHeroBanner[]>("/hero-banners");

// ── Auth ──────────────────────────────────────────────────────────────────────
export const loginApi = (body: { email: string; password: string }) =>
  apiClient.post<{ user: Record<string, unknown>; token: string }>("/auth/login", body);

export const registerApi = (body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) =>
  apiClient.post<{ user: Record<string, unknown>; token: string }>("/auth/register", body);

export const socialLoginApi = (body: {
  provider: string;
  providerId: string;
  firstName: string;
  lastName: string;
  email: string;
}) =>
  apiClient.post<{ user: Record<string, unknown>; token: string }>("/auth/social", body);

export const guestLoginApi = () =>
  apiClient.post<{ user: Record<string, unknown>; token: string }>("/auth/guest");
