import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop Premium Handcrafted Equestrian Tack',
  description: 'Browse our collection of hand-stitched full-grain leather bridles, halters, reins, and equestrian accessories. Lifetime warranty on stitching and hardware.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        padding: '120px 0', 
        textAlign: 'center', 
        backgroundColor: '#F8F4ED', 
        color: '#1B3A4B', 
        minHeight: '100vh', 
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        Loading collection...
      </div>
    }>
      <ShopPageClient />
    </Suspense>
  );
}
