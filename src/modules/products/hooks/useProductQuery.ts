'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product-service';
import type { IProductFilters } from '@/types';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: IProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  related: (id: string) => [...productKeys.all, 'related', id] as const,
  builderParts: (type: string) => ['builderParts', type] as const,
};

export function useProductsQuery(filters?: IProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters ?? {}),
    queryFn: () => productService.getProducts(filters),
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProductsQuery() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productService.getFeaturedProducts(),
  });
}

export function useRelatedProductsQuery(productId: string) {
  return useQuery({
    queryKey: productKeys.related(productId),
    queryFn: () => productService.getRelatedProducts(productId),
    enabled: !!productId,
  });
}
