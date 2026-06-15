import type { Metadata } from 'next';
import BlogListingPageClient from './BlogListingPageClient';

export const metadata: Metadata = {
  title: 'The Canter Journal — Equestrian Advice & Leather Care Tips',
  description: 'Explore expert equestrian tips, leather-care advice, and behind-the-scenes stories from the Canter Equestrians workshop.',
};

export default function BlogListingPage() {
  return <BlogListingPageClient />;
}
