import type { Metadata } from 'next';
import ComingSoonPageClient from './ComingSoonPageClient';

export const metadata: Metadata = {
  title: 'Coming Soon: The Horse Collection',
  description: 'Sign up for early access to the upcoming Horse Collection by Canter Equestrians. Handcrafted full-grain leather saddlery, bridles, and reins.',
};

export default function ComingSoonPage() {
  return <ComingSoonPageClient />;
}
