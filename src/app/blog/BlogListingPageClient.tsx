'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/layout/PageTransition';
import { Badge } from '@/components/ui/Badge';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blogPosts';
import { cn, formatDate } from '@/lib/utils';
import styles from './page.module.css';

export default function BlogListingPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter posts by category
  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  // Take the first post as the Featured Post (only when 'All' is selected, or take the first of the filtered)
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
  } as const;

  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        
        {/* Page Header */}
        <div className={styles.heroBanner}>
          <Image
            src="/images/blog/workshop-journey.png"
            alt="Handcrafted leather workshop journey"
            fill
            priority
            quality={80}
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The Canter Journal</h1>
            <p className={styles.heroSubtitle}>
              Insights on leather care, equestrian training tips, and behind-the-scenes stories from our workshop.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className={styles.categoriesBar}>
          <div className="container">
            <div className={styles.categoriesList}>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={cn(
                    styles.categoryBtn,
                    selectedCategory === cat.value && styles.activeCategory
                  )}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Area */}
        <section className={styles.postsSection}>
          <div className="container">
            {filteredPosts.length === 0 ? (
              <div className={styles.noPosts}>
                <p>No articles found in this category.</p>
              </div>
            ) : (
              <>
                {/* Featured Post (Big Card) */}
                {featuredPost && (
                  <div className={styles.featuredWrapper}>
                    <article className={styles.featuredCard}>
                      <div className={styles.featuredImageWrapper}>
                        <Image
                          src={featuredPost.featuredImage}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className={styles.featuredImage}
                          priority
                        />
                        <div className={styles.featuredBadge}>
                          <Badge variant="accent">{featuredPost.categoryLabel}</Badge>
                        </div>
                      </div>
                      <div className={styles.featuredDetails}>
                        <div className={styles.meta}>
                          <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                          <span className={styles.metaDivider}>·</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                        </Link>
                        <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                        <div className={styles.featuredFooter}>
                          <span className={styles.author}>By {featuredPost.author}</span>
                          <Link href={`/blog/${featuredPost.slug}`} className={styles.readMoreLink}>
                            Read Full Article &rarr;
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                )}

                {/* Sub Grid (Remaining Posts) */}
                {gridPosts.length > 0 && (
                  <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {gridPosts.map((post) => (
                      <motion.article
                        key={post.id}
                        className={styles.gridCard}
                        variants={cardVariants}
                      >
                        <div className={styles.gridImageWrapper}>
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.gridImage}
                          />
                          <div className={styles.gridBadge}>
                            <Badge variant="accent">{post.categoryLabel}</Badge>
                          </div>
                        </div>
                        <div className={styles.gridDetails}>
                          <div className={styles.meta}>
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span className={styles.metaDivider}>·</span>
                            <span>{post.readTime}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className={styles.gridTitle}>{post.title}</h3>
                          </Link>
                          <p className={styles.gridExcerpt}>{post.excerpt}</p>
                          <Link href={`/blog/${post.slug}`} className={styles.gridReadMore}>
                            Read Article &rarr;
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
