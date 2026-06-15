export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: 'bridles' | 'halters' | 'reins' | 'leads' | 'saddle-pads' | 'accessories';
  material: string;
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  productImage: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'leather-care' | 'equestrian-tips' | 'behind-the-scenes' | 'product-launches';
  categoryLabel: string;
  featuredImage: string;
  author: string;
  date: string;
  readTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ShippingZone {
  zone: string;
  region: string;
  delivery: string;
  cost: string;
  freeAbove?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
