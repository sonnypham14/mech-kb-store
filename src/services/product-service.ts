import { type IProduct, type IProductFilters } from '@/types';
import { MOCK_PRODUCTS, FEATURED_PRODUCTS } from '@/mocks/products';
import { MOCK_CASES, MOCK_PCBS, MOCK_SWITCHES, MOCK_KEYCAPS } from '@/mocks/builder-parts';
import { API_TIMEOUT } from '@/lib/constants';
import { delay } from '@/lib/utils';
import type { IBuilderCase, IBuilderPcb, IBuilderSwitch, IBuilderKeycaps } from '@/modules/keyboard-builder/types';

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
}

export const productService = {
  async getProducts(filters?: IProductFilters): Promise<IProductsResponse> {
    await delay(API_TIMEOUT);

    let filtered = [...MOCK_PRODUCTS];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (filters?.categoryId) {
      filtered = filtered.filter((p) => p.category.id === filters.categoryId);
    }

    if (filters?.brandId) {
      filtered = filtered.filter((p) => p.brand.id === filters.brandId);
    }

    if (filters?.switchType) {
      filtered = filtered.filter((p) => p.switchType === filters.switchType);
    }

    if (filters?.connectivity) {
      filtered = filtered.filter((p) => p.connectivity === filters.connectivity);
    }

    if (filters?.layout) {
      filtered = filtered.filter((p) => p.layout === filters.layout);
    }

    if (filters?.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sorting
    switch (filters?.sort) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 12;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      products: paginated,
      total: filtered.length,
      page,
      limit,
    };
  },

  async getProductById(id: string): Promise<IProduct | null> {
    await delay(API_TIMEOUT);
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  },

  async getProductBySlug(slug: string): Promise<IProduct | null> {
    await delay(API_TIMEOUT);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  },

  async getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    await delay(API_TIMEOUT);
    return MOCK_PRODUCTS.filter((p) => p.category.id === categoryId);
  },

  async getFeaturedProducts(): Promise<IProduct[]> {
    await delay(API_TIMEOUT);
    return FEATURED_PRODUCTS;
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<IProduct[]> {
    await delay(API_TIMEOUT);
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) return [];
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.id !== productId &&
        (p.category.id === product.category.id || p.brand.id === product.brand.id),
    ).slice(0, limit);
  },

  async getBuilderParts(
    type: 'case' | 'pcb' | 'switch' | 'keycaps',
  ): Promise<IBuilderCase[] | IBuilderPcb[] | IBuilderSwitch[] | IBuilderKeycaps[]> {
    await delay(API_TIMEOUT);
    switch (type) {
      case 'case':
        return MOCK_CASES;
      case 'pcb':
        return MOCK_PCBS;
      case 'switch':
        return MOCK_SWITCHES;
      case 'keycaps':
        return MOCK_KEYCAPS;
    }
  },
};
