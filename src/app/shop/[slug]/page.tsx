import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} — Premium Leather Tack`,
    description: product.shortDescription || product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} — Premium Leather Tack | Canter Equestrians`,
      description: product.shortDescription || product.description.slice(0, 155),
      images: [
        {
          url: product.images[0] || '/images/hero/hero-main.png',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient slug={slug} />;
}
