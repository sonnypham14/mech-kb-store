'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { type IProduct } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { formatPrice } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products.card');
  const locale = useLocale();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    addItem(product, 1);
    toast({
      title: t('addedToCart'),
      description: product.name,
      variant: 'default',
    });
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group"
    >
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="relative rounded-xl overflow-hidden bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/40 hover:shadow-glass transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.featured && (
                <Badge variant="gradient" className="text-xs">Featured</Badge>
              )}
              {product.compareAtPrice && (
                <Badge className="text-xs bg-red-500/80 text-white border-0">
                  Sale
                </Badge>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  inWishlist ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-xs text-purple-400 font-medium mb-1">{product.brand.name}</p>

            {/* Name */}
            <h3 className="font-semibold text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/50">({product.reviewCount})</span>
            </div>

            {/* Price + Action */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-xs text-white/40 line-through ml-1.5">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {product.stock > 0 ? (
                <Button
                  size="sm"
                  variant="gradient"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="gap-1.5 text-xs"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {isAddingToCart ? t('addedToCart') : t('addToCart')}
                </Button>
              ) : (
                <Badge variant="destructive" className="text-xs">{t('outOfStock')}</Badge>
              )}
            </div>

            {/* Connectivity badge */}
            <div className="flex gap-1.5 mt-3 flex-wrap">
              <Badge variant="outline" className="text-[10px] border-white/20 text-white/50">
                {product.layout}
              </Badge>
              <Badge variant="outline" className="text-[10px] border-white/20 text-white/50">
                {product.connectivity}
              </Badge>
              {product.switchType && (
                <Badge variant="outline" className="text-[10px] border-white/20 text-white/50">
                  {product.switchType}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
