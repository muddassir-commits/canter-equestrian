import type { NavLink } from '@/types';

export const SITE_CONFIG = {
  name: 'Canter Equestrian',
  tagline: 'Crafted for the Ride.',
  taglineAlt: 'Built for Every Bond.',
  domain: 'cantercompany.com',
  email: 'info@cantercompany.com',
  instagram: '@canterequestrians',
  instagramUrl: 'https://instagram.com/canterequestrians',
  facebookUrl: 'https://facebook.com/canterequestrians',
  pinterestUrl: 'https://pinterest.com/canterequestrians',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  {
    label: 'Collections',
    href: '#',
    children: [
      { label: 'Horse Collection', href: '/collections/horse' },
      { label: 'Tack & Accessories', href: '/shop' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Care Guide', href: '/care-guide' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Bridles', href: '/shop?category=bridles' },
    { label: 'Halters', href: '/shop?category=halters' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Care Guide', href: '/care-guide' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const TRUST_ITEMS = [
  { icon: 'Gem', label: 'Premium Full-Grain Leather' },
  { icon: 'Hand', label: 'Handcrafted with Care' },
  { icon: 'Globe', label: 'Ships to 30+ Countries' },
];

export const MATERIALS = [
  {
    title: 'Full Grain Leather',
    description: 'The finest quality leather, selected for its natural grain, durability, and beautiful patina that develops over time.',
    image: '/images/materials/leather.png',
  },
  {
    title: 'Solid Brass Hardware',
    description: 'Every buckle, clip, and fitting is crafted from solid brass — built to last a lifetime without corrosion.',
    image: '/images/materials/hardware.png',
  },
  {
    title: 'Hand-Stitched Details',
    description: 'Each stitch is placed by hand with precision, ensuring strength and beauty that machines simply cannot replicate.',
    image: '/images/about/workshop.png',
  },
];

export const STATS = [
  { value: 500, suffix: '+', label: 'Products Crafted' },
  { value: 30, suffix: '+', label: 'Countries Shipped To' },
  { value: 100, suffix: '%', label: 'Full-Grain Leather' },
  { value: 5, suffix: '★', label: 'Average Rating' },
];
