'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { ICategory } from '@/types';

interface CategoriesSectionProps {
  categories: ICategory[];
  locale: string;
}

export function CategoriesSection({ categories, locale }: CategoriesSectionProps) {
  const t = useTranslations('home.categories');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">{t('title')}</h2>
          <p className="text-white/60 mt-2">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/products?category=${category.slug}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl glass-card hover:border-purple-500/40 hover:shadow-neon transition-all"
              >
                {category.image && (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="text-center">
                  <p className="font-semibold text-white text-sm group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{category.productCount} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
