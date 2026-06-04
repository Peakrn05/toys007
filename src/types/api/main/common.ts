// Generic wrapper used when the backend wraps responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PageObject<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
