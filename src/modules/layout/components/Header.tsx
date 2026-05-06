'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Keyboard, ShoppingCart, Heart, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartCount = totalItems();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/builder`, label: t('builder') },
    { href: `/${locale}/sound-lab`, label: t('soundLab') },
    { href: `/${locale}/blog`, label: t('blog') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-900/90 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-neon group-hover:shadow-neon-purple transition-shadow">
                <Keyboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent hidden sm:block">
                MechKeys
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />

              {/* Wishlist */}
              <Link href={`/${locale}/dashboard`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge
                      variant="gradient"
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="relative text-white/80 hover:text-white hover:bg-white/10"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.div
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="gradient"
                      className="h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                    >
                      {cartCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
