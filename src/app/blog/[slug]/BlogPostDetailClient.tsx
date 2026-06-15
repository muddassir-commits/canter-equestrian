'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Twitter, Facebook, Instagram } from '@/components/ui/SocialIcons';

import { PageTransition } from '@/components/layout/PageTransition';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';
import { formatDate } from '@/lib/utils';
import styles from './page.module.css';

interface BlogPostDetailClientProps {
  slug: string;
}

export default function BlogPostDetailClient({ slug }: BlogPostDetailClientProps) {
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Simple parser to render mock article content as semantic HTML
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Handle Headings
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className={styles.heading3}>{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className={styles.heading2}>{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className={styles.heading1}>{trimmed.replace('# ', '')}</h1>;
      }

      // Handle Lists
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((item) => item.replace('- ', '').trim());
        return (
          <ul key={idx} className={styles.bulletList}>
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        );
      }

      // Handle Blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className={styles.blockquote}>
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      // Default Paragraph
      return <p key={idx} className={styles.paragraph}>{trimmed}</p>;
    });
  };

  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        <div className="container">
          
          {/* Back Button */}
          <Link href="/blog" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Journal
          </Link>

          {/* Article Wrapper Grid */}
          <div className={styles.grid}>
            
            {/* Main Article Content Column (Left) */}
            <main className={styles.articleCol}>
              <article>
                {/* Meta details */}
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} /> {formatDate(post.date)}
                  </span>
                  <span className={styles.metaItem}>
                    <User size={14} /> {post.author}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>

                <h1 className={styles.title}>{post.title}</h1>

                {/* Featured Image */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className={styles.image}
                    priority
                  />
                </div>

                {/* Rich Content Area */}
                <div className={styles.content}>
                  {renderContent(post.content)}
                </div>
              </article>
            </main>

            {/* Sidebar Column (Right) */}
            <aside className={styles.sidebarCol}>
              {/* Author Card */}
              <div className={styles.authorCard}>
                <div className={styles.authorAvatar}>C</div>
                <div className={styles.authorDetails}>
                  <h4 className={styles.authorName}>Canter Editorial</h4>
                  <p className={styles.authorBio}>
                    Equine gear specialists and leather craftsmen sharing insights from our workshop in India.
                  </p>
                </div>
              </div>

              {/* Share Box */}
              <div className={styles.shareCard}>
                <h4 className={styles.shareTitle}>Share This Article</h4>
                <div className={styles.shareLinks}>
                  <button className={styles.shareBtn} aria-label="Share on Twitter">
                    <Twitter size={18} />
                  </button>
                  <button className={styles.shareBtn} aria-label="Share on Facebook">
                    <Facebook size={18} />
                  </button>
                  <button className={styles.shareBtn} aria-label="Share on Instagram">
                    <Instagram size={18} />
                  </button>
                </div>
              </div>
            </aside>

          </div>

          {/* Related Articles Footer */}
          {relatedPosts.length > 0 && (
            <div className={styles.relatedSection}>
              <h3 className={styles.relatedHeading}>Related Articles</h3>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((p) => (
                  <article key={p.id} className={styles.relatedCard}>
                    <div className={styles.relatedImageWrapper}>
                      <Image
                        src={p.featuredImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className={styles.relatedImage}
                      />
                    </div>
                    <div className={styles.relatedDetails}>
                      <span className={styles.relatedCategory}>{p.categoryLabel}</span>
                      <Link href={`/blog/${p.slug}`}>
                        <h4 className={styles.relatedTitle}>{p.title}</h4>
                      </Link>
                      <Link href={`/blog/${p.slug}`} className={styles.relatedLink}>
                        Read Article &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}
