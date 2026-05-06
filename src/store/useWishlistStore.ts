'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IProduct } from '@/types';
import { WISHLIST_STORAGE_KEY } from '@/lib/constants';

interface IWishlistState {
  items: IProduct[];

  // Actions
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: IProduct) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<IWishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((p) => p.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
    }),
    {
      name: WISHLIST_STORAGE_KEY,
    },
  ),
);
