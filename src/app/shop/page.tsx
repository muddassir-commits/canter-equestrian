import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop Premium Handcrafted Equestrian Tack',
  description: 'Browse our collection of hand-stitched full-grain leather bridles, halters, reins, and equestrian accessories. Lifetime warranty on stitching and hardware.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F4ED', fontFamily: 'var(--font-heading)', color: '#1B3A4B' }}>Loading Shop...</div>}>
      <ShopPageClient />
    </Suspense>
  );
}
