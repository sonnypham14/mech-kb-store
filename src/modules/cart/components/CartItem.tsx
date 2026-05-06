'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import type { ICartItem } from '@/types';

interface ICartItemProps {
  item: ICartItem;
}

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export function CartItem({ item }: ICartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
        <Image
          src={item.product.thumbnail}
          alt={item.product.name}
          fill
          sizes="64px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-purple-400 font-medium">{item.product.brand.name}</p>
        <p className="text-sm font-semibold text-white truncate">{item.product.name}</p>
        <p className="text-sm text-white/70 mt-0.5">${(item.product.price * item.quantity).toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          className="h-7 w-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-6 text-center text-sm font-semibold text-white tabular-nums">
          {item.quantity}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
          className="h-7 w-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.id)}
        className="h-7 w-7 shrink-0 text-red-400/60 hover:text-red-400 hover:bg-red-400/10"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
}
