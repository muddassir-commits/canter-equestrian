import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'Our Story & Craftsmanship',
  description: 'Learn about Canter Equestrians. Discover how we bridge Indian leather artisanal legacy and global equestrian tack standards for the comfort of your horse.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
