'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart, ArrowRight, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/modules/cart/components/CartItem';
import { useCartStore } from '@/store/useCartStore';
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants';

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const subtotal = useCartStore((s) => s.subtotal);

  const sub = subtotal();
  const tax = sub * TAX_RATE;
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = sub + tax + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.35 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-gray-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-400" />
                <h2 className="text-base font-semibold text-white">
                  Cart
                  {items.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-white/50">({items.length} items)</span>
                  )}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Free shipping progress */}
            {remaining > 0 && sub > 0 && (
              <div className="px-5 py-3 bg-purple-500/10 border-b border-purple-500/20">
                <p className="text-xs text-purple-300">
                  Add{' '}
                  <span className="font-semibold">${remaining.toFixed(2)}</span>
                  {' '}more for free shipping!
                </p>
                <div className="mt-2 h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {sub >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20">
                <p className="text-xs text-emerald-400 font-medium">Free shipping unlocked!</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <div className="rounded-2xl bg-white/5 p-6">
                    <PackageOpen className="h-12 w-12 text-white/20 mx-auto" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white/60">Your cart is empty</p>
                    <p className="text-sm text-white/30 mt-1">Add some keyboards to get started</p>
                  </div>
                  <Button
                    onClick={closeCart}
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-5 py-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>${sub.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/en/checkout" onClick={closeCart}>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold">
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={closeCart}
                  className="w-full text-white/50 hover:text-white/80 hover:bg-white/5"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
