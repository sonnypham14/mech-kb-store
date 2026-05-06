'use client';

import { motion } from 'framer-motion';
import { type IProduct } from '@/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: IProduct[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProductGrid({ products, isLoading, emptyMessage }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-white/10">
            <Skeleton className="h-48 w-full bg-white/5" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-3 w-1/3 bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-3 w-2/3 bg-white/5" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20 bg-white/5" />
                <Skeleton className="h-8 w-28 rounded-md bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 rounded-2xl bg-white/5 mb-4">
          <PackageSearch className="h-12 w-12 text-white/30" />
        </div>
        <p className="text-white/60 text-lg">{emptyMessage ?? 'No products found'}</p>
        <p className="text-white/40 text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
