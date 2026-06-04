export interface ApiBrand {
  id: string;
  name: string;
  categoryId?: string | null;
  description: string;
  productCount: number;
  colorClass: string;
  tagColorClass: string;
  displayOrder: number;
}
