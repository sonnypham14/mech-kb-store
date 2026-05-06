'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MOCK_CATEGORIES } from '@/mocks/categories';
import { MOCK_BRANDS } from '@/mocks/brands';
import { SwitchType, Connectivity } from '@/types';
import { PRICE_RANGES } from '../types';

export function ProductFilters() {
  const t = useTranslations('products.filters');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters = searchParams.toString().length > 0;

  const currentCategory = searchParams.get('category');
  const currentBrand = searchParams.get('brand');
  const currentSwitchType = searchParams.get('switchType');
  const currentConnectivity = searchParams.get('connectivity');
  const currentMinPrice = searchParams.get('minPrice');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-purple-400" />
          <span className="font-semibold text-white">{t('title')}</span>
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-white/50 hover:text-white text-xs gap-1"
          >
            <X className="h-3 w-3" />
            {t('clearAll')}
          </Button>
        )}
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {currentCategory && (
            <Badge
              variant="glass"
              className="gap-1 cursor-pointer hover:bg-white/20"
              onClick={() => updateFilter('category', null)}
            >
              {MOCK_CATEGORIES.find((c) => c.slug === currentCategory)?.name ?? currentCategory}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {currentBrand && (
            <Badge
              variant="glass"
              className="gap-1 cursor-pointer hover:bg-white/20"
              onClick={() => updateFilter('brand', null)}
            >
              {MOCK_BRANDS.find((b) => b.slug === currentBrand)?.name ?? currentBrand}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {currentSwitchType && (
            <Badge
              variant="glass"
              className="gap-1 cursor-pointer hover:bg-white/20"
              onClick={() => updateFilter('switchType', null)}
            >
              {currentSwitchType}
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}

      <Separator className="bg-white/10" />

      {/* Category */}
      <div>
        <p className="text-sm font-medium text-white mb-3">{t('category')}</p>
        <div className="space-y-2">
          {MOCK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={currentCategory === cat.slug}
                onCheckedChange={() => updateFilter('category', cat.slug)}
                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`cat-${cat.id}`}
                className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors flex-1"
              >
                {cat.name}
              </Label>
              <span className="text-xs text-white/30">{cat.productCount}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Brand */}
      <div>
        <p className="text-sm font-medium text-white mb-3">{t('brand')}</p>
        <div className="space-y-2">
          {MOCK_BRANDS.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={currentBrand === brand.slug}
                onCheckedChange={() => updateFilter('brand', brand.slug)}
                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Price Range */}
      <div>
        <p className="text-sm font-medium text-white mb-3">{t('priceRange')}</p>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <div key={range.label} className="flex items-center gap-2">
              <Checkbox
                id={`price-${range.label}`}
                checked={currentMinPrice === String(range.min)}
                onCheckedChange={() => {
                  updateFilter('minPrice', String(range.min));
                  updateFilter('maxPrice', String(range.max));
                }}
                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`price-${range.label}`}
                className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Switch Type */}
      <div>
        <p className="text-sm font-medium text-white mb-3">{t('switchType')}</p>
        <div className="space-y-2">
          {Object.values(SwitchType).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`switch-${type}`}
                checked={currentSwitchType === type}
                onCheckedChange={() => updateFilter('switchType', type)}
                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`switch-${type}`}
                className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors capitalize"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Connectivity */}
      <div>
        <p className="text-sm font-medium text-white mb-3">{t('connectivity')}</p>
        <div className="space-y-2">
          {Object.values(Connectivity).map((conn) => (
            <div key={conn} className="flex items-center gap-2">
              <Checkbox
                id={`conn-${conn}`}
                checked={currentConnectivity === conn}
                onCheckedChange={() => updateFilter('connectivity', conn)}
                className="border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`conn-${conn}`}
                className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors capitalize"
              >
                {conn}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
