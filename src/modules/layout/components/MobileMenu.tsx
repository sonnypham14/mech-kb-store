'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Package, Cpu, Music, BookOpen, Info } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { href: `/${locale}`, label: t('home'), icon: Home },
    { href: `/${locale}/products`, label: t('products'), icon: Package },
    { href: `/${locale}/builder`, label: t('builder'), icon: Cpu },
    { href: `/${locale}/sound-lab`, label: t('soundLab'), icon: Music },
    { href: `/${locale}/blog`, label: t('blog'), icon: BookOpen },
    { href: `/${locale}/about`, label: t('about'), icon: Info },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-gray-900/95 backdrop-blur-md border-r border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                MechKeys
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-purple-400" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                <Link
                  href={`/${locale}/auth/login`}
                  onClick={onClose}
                  className="flex-1 text-center py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  onClick={onClose}
                  className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  {t('register')}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
