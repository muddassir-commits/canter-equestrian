import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { HeroBanner } from '@/components/home/HeroBanner';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutPreview } from '@/components/home/AboutPreview';
import { MaterialsShowcase } from '@/components/home/MaterialsShowcase';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { InstagramFeed } from '@/components/home/InstagramFeed';

export default function Home() {
  return (
    <PageTransition>
      <HeroBanner />
      <TrustBar />
      <FeaturedProducts />
      <AboutPreview />
      <MaterialsShowcase />
      <TestimonialsSection />
      <BlogPreview />
      <InstagramFeed />
    </PageTransition>
  );
}

