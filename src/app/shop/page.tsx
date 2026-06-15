import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop Premium Handcrafted Equestrian Tack',
  description: 'Browse our collection of hand-stitched full-grain leather bridles, halters, reins, and equestrian accessories. Lifetime warranty on stitching and hardware.',
};

export default function ShopPage() {
  return <ShopPageClient />;
}
