import { type ICartItem, type IProduct } from '@/types';
import { generateId } from '@/lib/utils';

export const cartService = {
  addToCart(items: ICartItem[], product: IProduct, quantity = 1): ICartItem[] {
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      return items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
          : item,
      );
    }
    const newItem: ICartItem = {
      id: generateId(),
      product,
      quantity,
      addedAt: new Date().toISOString(),
    };
    return [...items, newItem];
  },

  removeFromCart(items: ICartItem[], itemId: string): ICartItem[] {
    return items.filter((item) => item.id !== itemId);
  },

  updateQuantity(items: ICartItem[], itemId: string, quantity: number): ICartItem[] {
    if (quantity <= 0) return items.filter((item) => item.id !== itemId);
    return items.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.min(quantity, 10) } : item,
    );
  },

  clearCart(): ICartItem[] {
    return [];
  },

  calculateSubtotal(items: ICartItem[]): number {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  calculateTotal(items: ICartItem[], shippingCost = 0, taxRate = 0.08): number {
    const subtotal = cartService.calculateSubtotal(items);
    return subtotal + shippingCost + subtotal * taxRate;
  },

  getTotalItems(items: ICartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
};
