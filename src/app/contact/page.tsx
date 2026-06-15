import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us — Customer Support & Fitting Inquiries',
  description: 'Reach out to Canter Equestrians for sizing questions, order details, custom fittings, or wholesale partnerships. Kanpur, India workshops.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
