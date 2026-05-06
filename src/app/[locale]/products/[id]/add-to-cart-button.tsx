'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { type IProduct } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    toast({ title: 'Added to cart', description: product.name });
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock === 0) {
    return (
      <Button disabled size="lg" className="flex-1 opacity-50">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="flex gap-3 flex-1">
      {/* Quantity */}
      <div className="flex items-center rounded-lg border border-white/20 bg-white/5">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 text-white/60 hover:text-white transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-white text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          className="px-3 py-2 text-white/60 hover:text-white transition-colors"
        >
          +
        </button>
      </div>

      <Button
        variant={added ? 'default' : 'gradient'}
        size="lg"
        className="flex-1 gap-2"
        onClick={handleAdd}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" /> Added!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
