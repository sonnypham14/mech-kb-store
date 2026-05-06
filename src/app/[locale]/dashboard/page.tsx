'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/hooks/use-toast';
import { OrderStatus } from '@/types';
import { Package, Heart, User, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

interface IMockOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
}

const MOCK_ORDERS: IMockOrder[] = [
  { id: 'o1', orderNumber: 'MK-A3F9B2', date: '2026-04-15', status: OrderStatus.Delivered, total: 289.97, items: 3 },
  { id: 'o2', orderNumber: 'MK-7C2D44', date: '2026-03-28', status: OrderStatus.Shipped, total: 139.99, items: 1 },
  { id: 'o3', orderNumber: 'MK-E81F6A', date: '2026-02-10', status: OrderStatus.Delivered, total: 449.95, items: 4 },
  { id: 'o4', orderNumber: 'MK-9B4C10', date: '2025-12-22', status: OrderStatus.Cancelled, total: 79.99, items: 1 },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  [OrderStatus.Processing]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [OrderStatus.Shipped]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  [OrderStatus.Delivered]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [OrderStatus.Cancelled]: 'bg-red-500/20 text-red-400 border-red-500/30',
  [OrderStatus.Refunded]: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

function OrdersTab() {
  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-4 text-center">
        <ShoppingBag className="h-12 w-12 text-white/20" />
        <p className="text-white/40">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {MOCK_ORDERS.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
            <Package className="h-5 w-5 text-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-white font-mono">{order.orderNumber}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border font-medium ${STATUS_STYLES[order.status]}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              {new Date(order.date).toLocaleDateString()} · {order.items} item{order.items > 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-white">${order.total.toFixed(2)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WishlistTab() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-4 text-center">
        <Heart className="h-12 w-12 text-white/20" />
        <p className="text-white/40">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
        >
          <div className="relative h-36 w-full bg-white/5">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="300px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div className="p-3">
            <p className="text-xs text-purple-400">{product.brand.name}</p>
            <p className="text-sm font-semibold text-white truncate">{product.name}</p>
            <p className="text-sm font-bold text-white mt-1">${product.price.toFixed(2)}</p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-xs"
                onClick={() => {
                  addItem(product, 1);
                  toast({ title: 'Added to cart', description: product.name });
                }}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeItem(product.id)}
                className="text-red-400/60 hover:text-red-400 hover:bg-red-400/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProfileTab() {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  };

  return (
    <div className="max-w-lg space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          JD
        </div>
        <div>
          <p className="text-base font-semibold text-white">John Doe</p>
          <p className="text-sm text-white/40">Member since January 2025</p>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-sm text-white/70">First Name</Label>
            <Input defaultValue="John" className="bg-white/5 border-white/20 text-white focus:border-purple-500" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm text-white/70">Last Name</Label>
            <Input defaultValue="Doe" className="bg-white/5 border-white/20 text-white focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">Email</Label>
          <Input defaultValue="john.doe@example.com" type="email" className="bg-white/5 border-white/20 text-white focus:border-purple-500" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm text-white/70">Phone</Label>
          <Input placeholder="+1 555 000 0000" className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-purple-500" />
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
      >
        {isSaving ? 'Saving…' : 'Save Changes'}
      </Button>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Manage your orders, wishlist, and profile</p>
        </div>

        <div className="rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-6">
          <Tabs defaultValue="orders">
            <TabsList className="bg-white/10 border border-white/10 mb-6">
              <TabsTrigger value="orders" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/60 gap-1.5">
                <Package className="h-4 w-4" />
                <span className="hidden sm:block">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/60 gap-1.5">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:block">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/60 gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden sm:block">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>
            <TabsContent value="wishlist">
              <WishlistTab />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
