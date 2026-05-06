import { Suspense } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Zap, Cpu, Volume2 } from 'lucide-react';
import { productService } from '@/services/product-service';
import { ProductGrid } from '@/modules/products/components/ProductGrid';
import { HeroSection } from './hero-section';
import { CategoriesSection } from './categories-section';
import { Skeleton } from '@/components/ui/skeleton';
import { MOCK_CATEGORIES } from '@/mocks/categories';

export default async function HomePage() {
  const t = await getTranslations('home');
  const locale = await getLocale();

  const featuredProducts = await productService.getFeaturedProducts();

  const stats = [
    { value: '200+', label: t('stats.products') },
    { value: '15+', label: t('stats.brands') },
    { value: '50K+', label: t('stats.customers') },
    { value: '10K+', label: t('stats.reviews') },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection locale={locale} />

      {/* Stats */}
      <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">{t('featured.title')}</h2>
            <p className="text-white/60 mt-2">{t('featured.subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            {t('featured.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={featuredProducts} />
        </Suspense>
      </section>

      {/* Categories */}
      <CategoriesSection categories={MOCK_CATEGORIES} locale={locale} />

      {/* Builder CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 backdrop-blur-md border border-white/20 p-12 text-center shadow-glass-lg">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-neon">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{t('builder.title')}</h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                {t('builder.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/builder`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-neon hover:shadow-neon-purple"
                >
                  <Zap className="h-5 w-5" />
                  {t('builder.cta')}
                </Link>
                <Link
                  href={`/${locale}/sound-lab`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  <Volume2 className="h-5 w-5" />
                  {t('soundLab.cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden glass-card">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
