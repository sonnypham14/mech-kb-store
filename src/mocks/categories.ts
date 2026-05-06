import { type ICategory } from '@/types';

export const MOCK_CATEGORIES: ICategory[] = [
  {
    id: 'cat-fullsize',
    name: 'Full-Size',
    slug: 'full-size',
    description: '104-108 keys with numpad, function row, and navigation cluster.',
    image: 'https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?w=600',
    productCount: 3,
  },
  {
    id: 'cat-tkl',
    name: 'TKL (80%)',
    slug: 'tkl',
    description: '87-88 keys — full layout minus the numpad for more desk space.',
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d44a?w=600',
    productCount: 4,
  },
  {
    id: 'cat-75',
    name: '75%',
    slug: '75-percent',
    description: '84 keys with function row and arrows in a compact form factor.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    productCount: 3,
  },
  {
    id: 'cat-65',
    name: '65%',
    slug: '65-percent',
    description: '68 keys — compact layout that keeps dedicated arrow keys.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
    productCount: 2,
  },
  {
    id: 'cat-60',
    name: '60%',
    slug: '60-percent',
    description: '61 keys — ultra-portable layout using layers for function access.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600',
    productCount: 3,
  },
  {
    id: 'cat-split',
    name: 'Split',
    slug: 'split',
    description: 'Ergonomic split design for reduced strain during long sessions.',
    image: 'https://images.unsplash.com/photo-1601445638532-1a20c23cddfa?w=600',
    productCount: 1,
  },
];
