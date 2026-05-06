'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ICartItem, type IProduct } from '@/types';
import { cartService } from '@/services/cart-service';
import { CART_STORAGE_KEY } from '@/lib/constants';

interface ICartState {
  items: ICartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: IProduct, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed (derived)
  totalPrice: () => number;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => ({
          items: cartService.addToCart(state.items, product, quantity),
        }));
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: cartService.removeFromCart(state.items, itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: cartService.updateQuantity(state.items, itemId, quantity),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalPrice: () => {
        const { items } = get();
        const subtotal = cartService.calculateSubtotal(items);
        return subtotal + subtotal * 0.08;
      },

      totalItems: () => {
        return cartService.getTotalItems(get().items);
      },

      subtotal: () => {
        return cartService.calculateSubtotal(get().items);
      },
    }),
    {
      name: CART_STORAGE_KEY,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
