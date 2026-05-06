export const API_TIMEOUT = 800;
export const DEFAULT_LOCALE = 'en' as const;
export const SUPPORTED_LOCALES = ['en', 'vi'] as const;
export const MAX_COMPARE_ITEMS = 4;
export const CART_STORAGE_KEY = 'mech-kb-cart';
export const BUILDER_STORAGE_KEY = 'mech-kb-builder';
export const WISHLIST_STORAGE_KEY = 'mech-kb-wishlist';
export const THEME_STORAGE_KEY = 'mech-kb-theme';
export const PRODUCTS_PER_PAGE = 12;
export const MAX_CART_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 150;
export const TAX_RATE = 0.08;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
] as const;

export const SWITCH_TYPES = ['linear', 'tactile', 'clicky'] as const;
export const CONNECTIVITY_TYPES = ['wired', 'wireless', 'bluetooth'] as const;
export const LAYOUT_TYPES = ['100%', 'TKL', '75%', '65%', '60%', 'Split'] as const;

export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/mechkeys',
  instagram: 'https://instagram.com/mechkeysstore',
  twitter: 'https://twitter.com/mechkeysstore',
  youtube: 'https://youtube.com/@mechkeysstore',
} as const;

export const CONTACT_EMAIL = 'hello@mechkeysstore.com';
