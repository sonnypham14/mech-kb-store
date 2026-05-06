import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { productService } from '@/services/product-service';
import { ProductGrid } from '@/modules/products/components/ProductGrid';
import { ProductFilters } from '@/modules/products/components/ProductFilters';
import { SwitchType, Connectivity, Layout } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    switchType?: string;
    connectivity?: string;
    layout?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

async function ProductsList({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const t = await getTranslations('products');

  const filters = {
    categoryId: params.category ? `cat-${params.category}` : undefined,
    brandId: params.brand ? `brand-${params.brand}` : undefined,
    switchType: params.switchType as SwitchType | undefined,
    connectivity: params.connectivity as Connectivity | undefined,
    layout: params.layout as Layout | undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    search: params.search,
    sort: params.sort as 'featured' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating' | undefined,
    page: params.page ? Number(params.page) : 1,
    limit: 12,
  };

  const { products, total } = await productService.getProducts(filters);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/50">
          {total} {t('common', { ns: 'common' }) ?? 'products found'}
        </p>
      </div>
      <ProductGrid products={products} emptyMessage={t('noResults')} />
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const t = await getTranslations('products');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        <p className="text-white/60 mt-2">{t('subtitle')}</p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 glass-card p-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-white/5 rounded-lg" />}>
              <ProductFilters />
            </Suspense>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile filter button would go here */}
              <span className="text-sm text-white/50">{t('filters.title')}</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-white/50 hidden sm:block">{t('sort.label')}:</span>
              <form>
                <Select name="sort" defaultValue="featured">
                  <SelectTrigger className="w-44 bg-white/5 border-white/20 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 border-white/20 text-white">
                    <SelectItem value="featured" className="focus:bg-white/10 focus:text-white">{t('sort.featured')}</SelectItem>
                    <SelectItem value="priceAsc" className="focus:bg-white/10 focus:text-white">{t('sort.priceAsc')}</SelectItem>
                    <SelectItem value="priceDesc" className="focus:bg-white/10 focus:text-white">{t('sort.priceDesc')}</SelectItem>
                    <SelectItem value="newest" className="focus:bg-white/10 focus:text-white">{t('sort.newest')}</SelectItem>
                    <SelectItem value="rating" className="focus:bg-white/10 focus:text-white">{t('sort.rating')}</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </div>
          </div>

          <Suspense
            fallback={
              <ProductGrid products={[]} isLoading />
            }
          >
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
