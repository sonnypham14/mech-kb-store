import { SwitchType, Connectivity, Layout } from '@/types';

export interface IProductFilterParams {
  categoryId?: string;
  brandId?: string;
  minPrice?: string;
  maxPrice?: string;
  switchType?: SwitchType;
  connectivity?: Connectivity;
  layout?: Layout;
  search?: string;
  sort?: string;
  page?: string;
}

export interface IFilterOption {
  value: string;
  label: string;
  count?: number;
}

export const PRICE_RANGES = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: '$200 – $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: 9999 },
] as const;
