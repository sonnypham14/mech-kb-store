'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/store/useBuilderStore';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/hooks/use-toast';
import type { IBuilderPart } from '@/modules/keyboard-builder/types';
import type { IProduct } from '@/types';
import { Layout, Connectivity } from '@/types';

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

function builderPartToProduct(part: IBuilderPart, category: string): IProduct {
  return {
    id: part.id,
    name: part.name,
    slug: part.id,
    description: part.description,
    price: part.price,
    images: [part.image],
    thumbnail: part.image,
    brand: { id: part.brand, name: part.brand, slug: part.brand.toLowerCase().replace(/\s/g, '-') },
    category: { id: category, name: category, slug: category.toLowerCase(), productCount: 0 },
    layout: Layout.SixtyFive,
    connectivity: Connectivity.Wired,
    rating: 0,
    reviewCount: 0,
    stock: 99,
    sku: part.id,
    tags: [],
    featured: false,
    specs: part.specs,
    color: [],
    createdAt: new Date().toISOString(),
    reviews: [],
  };
}

interface IReviewRowProps {
  label: string;
  part: IBuilderPart | null;
  index: number;
}

function ReviewRow({ label, part, index }: IReviewRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-center gap-4 p-4 rounded-xl border
        ${part
          ? 'bg-white/10 dark:bg-black/20 border-white/20'
          : 'bg-amber-500/5 border-amber-500/20'
        }
      `}
    >
      <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-white/5">
        {part ? (
          <Image
            src={part.image}
            alt={part.name}
            fill
            sizes="56px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/40 uppercase tracking-wide">{label}</p>
        {part ? (
          <>
            <p className="text-sm font-semibold text-white truncate">{part.name}</p>
            <p className="text-xs text-white/50">{part.brand}</p>
          </>
        ) : (
          <p className="text-sm text-amber-400">Not selected</p>
        )}
      </div>

      <div className="text-right shrink-0">
        {part ? (
          <span className="text-sm font-bold text-white">${part.price.toFixed(2)}</span>
        ) : (
          <span className="text-xs text-amber-400">Required</span>
        )}
      </div>
    </motion.div>
  );
}

export function ReviewStep() {
  const selectedCase = useBuilderStore((s) => s.selectedCase);
  const selectedPcb = useBuilderStore((s) => s.selectedPcb);
  const selectedSwitch = useBuilderStore((s) => s.selectedSwitch);
  const selectedKeycaps = useBuilderStore((s) => s.selectedKeycaps);
  const totalPrice = useBuilderStore((s) => s.totalPrice);
  const reset = useBuilderStore((s) => s.reset);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toast } = useToast();

  const total = totalPrice();
  const allSelected = selectedCase && selectedPcb && selectedSwitch && selectedKeycaps;

  const parts: Array<{ label: string; part: IBuilderPart | null; category: string }> = [
    { label: 'Case', part: selectedCase, category: 'Cases' },
    { label: 'PCB', part: selectedPcb, category: 'PCBs' },
    { label: 'Switch', part: selectedSwitch, category: 'Switches' },
    { label: 'Keycaps', part: selectedKeycaps, category: 'Keycaps' },
  ];

  const handleAddAllToCart = () => {
    const selected = parts.filter((p) => p.part !== null);
    selected.forEach(({ part, category }) => {
      if (part) {
        addItem(builderPartToProduct(part, category), 1);
      }
    });
    openCart();
    toast({
      title: 'Added to cart!',
      description: `${selected.length} part${selected.length > 1 ? 's' : ''} added to your cart.`,
    });
    reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Review Your Build</h2>
        <p className="text-sm text-white/50 mt-1">
          Check your selections before adding everything to cart.
        </p>
      </div>

      {!allSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
        >
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-sm text-amber-300">
            Some parts are not selected. Complete all steps for the best build.
          </p>
        </motion.div>
      )}

      <div className="space-y-3">
        {parts.map(({ label, part }, index) => (
          <ReviewRow key={label} label={label} part={part} index={index} />
        ))}
      </div>

      <Separator className="bg-white/10" />

      <div className="flex items-center justify-between px-1">
        <span className="text-base font-semibold text-white">Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-white"
        >
          ${total.toFixed(2)}
        </motion.span>
      </div>

      <Button
        onClick={handleAddAllToCart}
        disabled={!allSelected}
        size="lg"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add All to Cart
      </Button>

      {!allSelected && (
        <p className="text-center text-xs text-white/30">Select all parts to enable checkout</p>
      )}
    </div>
  );
}
