'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/modules/cart/components/CartItem';
import { useCartStore } from '@/store/useCartStore';
import { useLocale } from 'next-intl';
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants';

export default function CartPage() {
  const locale = useLocale();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const sub = subtotal();
  const tax = sub * TAX_RATE;
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : sub > 0 ? 9.99 : 0;
  const total = sub + tax + shipping;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShoppingCart className="h-7 w-7 text-purple-400" />
              Your Cart
            </h1>
            <p className="mt-1 text-sm text-white/50">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-400/60 hover:text-red-400 hover:bg-red-400/10 text-sm"
            >
              Clear cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-6"
          >
            <div className="rounded-3xl bg-white/5 p-10 border border-white/10">
              <ShoppingBag className="h-20 w-20 text-white/15 mx-auto" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white/60">Your cart is empty</h2>
              <p className="text-sm text-white/30 mt-1">Start exploring our collection of keyboards and parts.</p>
            </div>
            <Link href={`/${locale}/products`}>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>

              <div className="pt-4">
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-6 sticky top-24"
              >
                <h2 className="text-base font-semibold text-white mb-5">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>${sub.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-400">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-white/30 border border-white/10 rounded-lg p-2.5 bg-white/5">
                      Add ${(FREE_SHIPPING_THRESHOLD - sub).toFixed(2)} more for free shipping
                    </p>
                  )}

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href={`/${locale}/checkout`} className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <p className="mt-3 text-center text-xs text-white/30">
                  Secure checkout powered by Stripe
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
