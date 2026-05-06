import { z } from 'zod';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Refunded = 'refunded',
}

export enum SwitchType {
  Linear = 'linear',
  Tactile = 'tactile',
  Clicky = 'clicky',
}

export enum Connectivity {
  Wired = 'wired',
  Wireless = 'wireless',
  Bluetooth = 'bluetooth',
}

export enum Layout {
  Full = '100%',
  TKL = 'TKL',
  SeventyFive = '75%',
  SixtyFive = '65%',
  Sixty = '60%',
  Split = 'Split',
}

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  productCount: z.number().default(0),
});

export const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userAvatar: z.string().optional(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  body: z.string(),
  verified: z.boolean().default(false),
  helpful: z.number().default(0),
  createdAt: z.string().or(z.date()),
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  images: z.array(z.string()).min(1),
  thumbnail: z.string(),
  brand: BrandSchema,
  category: CategorySchema,
  switchType: z.nativeEnum(SwitchType).optional(),
  layout: z.nativeEnum(Layout),
  connectivity: z.nativeEnum(Connectivity),
  weight: z.string().optional(),
  material: z.string().optional(),
  color: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().default(0),
  stock: z.number().int().min(0).default(0),
  sku: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  specs: z.record(z.string()).default({}),
  createdAt: z.string().or(z.date()),
  reviews: z.array(ReviewSchema).default([]),
});

export const CartItemSchema = z.object({
  id: z.string(),
  product: ProductSchema,
  quantity: z.number().int().positive(),
  addedAt: z.string().or(z.date()),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  createdAt: z.string().or(z.date()),
  addresses: z
    .array(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string(),
        isDefault: z.boolean().default(false),
      }),
    )
    .default([]),
});

export const OrderItemSchema = z.object({
  id: z.string(),
  product: ProductSchema,
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  userId: z.string(),
  items: z.array(OrderItemSchema),
  status: z.nativeEnum(OrderStatus),
  subtotal: z.number().positive(),
  shipping: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().positive(),
  shippingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const BuilderSelectionSchema = z.object({
  caseId: z.string().optional(),
  pcbId: z.string().optional(),
  switchId: z.string().optional(),
  keycapsId: z.string().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type ICategory = z.infer<typeof CategorySchema>;
export type IBrand = z.infer<typeof BrandSchema>;
export type IReview = z.infer<typeof ReviewSchema>;
export type IProduct = z.infer<typeof ProductSchema>;
export type ICartItem = z.infer<typeof CartItemSchema>;
export type IUser = z.infer<typeof UserSchema>;
export type IOrderItem = z.infer<typeof OrderItemSchema>;
export type IOrder = z.infer<typeof OrderSchema>;
export type IBuilderSelection = z.infer<typeof BuilderSelectionSchema>;

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface IProductFilters {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  switchType?: SwitchType;
  connectivity?: Connectivity;
  layout?: Layout;
  search?: string;
  sort?: 'featured' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

// ─── Auth Form Types ──────────────────────────────────────────────────────────

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterFormSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ILoginForm = z.infer<typeof LoginFormSchema>;
export type IRegisterForm = z.infer<typeof RegisterFormSchema>;

// ─── Checkout Form Types ──────────────────────────────────────────────────────

export const ShippingFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(4, 'Invalid ZIP code'),
  country: z.string().min(1, 'Country is required'),
  saveAddress: z.boolean().default(false),
});

export const PaymentFormSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number').max(19),
  cardName: z.string().min(2, 'Name is required'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format MM/YY'),
  cvv: z.string().min(3).max(4),
});

export type IShippingForm = z.infer<typeof ShippingFormSchema>;
export type IPaymentForm = z.infer<typeof PaymentFormSchema>;
