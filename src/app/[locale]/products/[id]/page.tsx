import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Star, Heart, Package, Wifi, Zap } from 'lucide-react';
import { productService } from '@/services/product-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from '@/modules/products/components/ProductGrid';
import { AddToCartButton } from './add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations('products.detail');

  const [product, relatedProducts] = await Promise.all([
    productService.getProductById(id),
    productService.getRelatedProducts(id),
  ]);

  if (!product) notFound();

  const mainImage = product.images[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/products`} className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <span className="text-white/70">{product.name}</span>
      </div>

      {/* Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden glass-card cursor-pointer hover:border-purple-500/40 transition-colors">
                <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="100px" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Brand & Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="gradient">{product.brand.name}</Badge>
            <Badge variant="outline" className="border-white/20 text-white/60">{product.category.name}</Badge>
            {product.featured && <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Featured</Badge>}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-white leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-white/40">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xl text-white/40 line-through mb-1">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {product.compareAtPrice && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-1">
                Save {formatPrice(product.compareAtPrice - product.price)}
              </Badge>
            )}
          </div>

          {/* Short desc */}
          {product.shortDescription && (
            <p className="text-white/70">{product.shortDescription}</p>
          )}

          <Separator className="bg-white/10" />

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Package, label: t('layout'), value: product.layout },
              { icon: Zap, label: t('switchType'), value: product.switchType ?? 'N/A' },
              { icon: Wifi, label: t('connectivity'), value: product.connectivity },
              { icon: Package, label: t('brand'), value: product.brand.name },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <Icon className="h-4 w-4 text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs text-white/40">{label}</p>
                  <p className="text-sm font-medium text-white capitalize">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${t('availability')}: In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <AddToCartButton product={product} />
            <Button variant="glass" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-xs text-white/30">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-6 mb-16">
        <Tabs defaultValue="description">
          <TabsList className="bg-white/5 border border-white/10 mb-6">
            <TabsTrigger value="description" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60">
              {t('description')}
            </TabsTrigger>
            <TabsTrigger value="specs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60">
              {t('specifications')}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60">
              {t('reviews')} ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <p className="text-white/70 leading-relaxed">{product.description}</p>
          </TabsContent>

          <TabsContent value="specs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white/50 text-sm">{key}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {product.reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-white text-sm">{review.userName}</p>
                      <div className="flex mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                        ))}
                      </div>
                    </div>
                    {review.verified && (
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">Verified</Badge>
                    )}
                  </div>
                  <p className="font-medium text-white text-sm mb-1">{review.title}</p>
                  <p className="text-white/60 text-sm">{review.body}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">{t('relatedProducts')}</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
