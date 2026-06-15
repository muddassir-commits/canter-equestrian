import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/data/blogPosts';
import BlogPostDetailClient from './BlogPostDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} — Canter Journal`,
    description: post.excerpt || post.content.slice(0, 155),
    openGraph: {
      title: `${post.title} — Canter Journal | Canter Equestrians`,
      description: post.excerpt || post.content.slice(0, 155),
      images: [
        {
          url: post.featuredImage || '/images/hero/hero-main.png',
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailClient slug={slug} />;
}
