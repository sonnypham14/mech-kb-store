'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="glass" className="mb-6 text-sm px-4 py-1.5 gap-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            {t('badge')}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6"
        >
          {t('title').split(' ').slice(0, 3).join(' ')}{' '}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {t('title').split(' ').slice(3).join(' ')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild variant="gradient" size="xl" className="group">
            <Link href={`/${locale}/products`}>
              {t('cta')}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href={`/${locale}/builder`}>{t('builderCta')}</Link>
          </Button>
        </motion.div>

        {/* Floating keyboard card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 mx-auto max-w-3xl"
        >
          <div className="relative rounded-2xl overflow-hidden glass-card p-1 shadow-glass-lg">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30 aspect-[16/7] flex items-center justify-center">
              {/* Keyboard visual placeholder */}
              <div className="w-full h-full p-8 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  {/* Key rows */}
                  {[
                    { keys: 14, width: '100%' },
                    { keys: 13, width: '95%' },
                    { keys: 12, width: '90%' },
                    { keys: 11, width: '85%' },
                  ].map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1.5 mb-1.5 justify-center">
                      {Array.from({ length: row.keys }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + rowIndex * 0.1 + i * 0.02 }}
                          className="h-8 flex-1 rounded bg-white/10 border border-white/20 shadow-sm hover:bg-white/20 transition-colors cursor-default"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
