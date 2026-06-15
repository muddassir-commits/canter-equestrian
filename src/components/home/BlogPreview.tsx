'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blogPosts';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { formatDate } from '@/lib/utils';
import { Badge } from '../ui/Badge';
import styles from './BlogPreview.module.css';

export const BlogPreview: React.FC = () => {
  const latestPosts = blogPosts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
      },
    },
  } as const;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The Canter Journal"
          title="Stories & Riding Advice"
          subtitle="Explore our articles on leather care, equestrian tips, and behind-the-scenes stories from Canter Equestrians."
        />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {latestPosts.map((post) => (
            <motion.article key={post.id} className={styles.postCard} variants={cardVariants}>
              {/* Featured Image */}
              <div className={styles.imageWrapper}>
                <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                    loading="lazy"
                  />
                </Link>
                <div className={styles.badgeWrapper}>
                  <Badge variant="accent">{post.categoryLabel}</Badge>
                </div>
              </div>

              {/* Card Meta & Content */}
              <div className={styles.details}>
                <div className={styles.meta}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className={styles.divider}>·</span>
                  <span>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                  <h3 className={styles.title}>{post.title}</h3>
                </Link>

                <p className={styles.excerpt}>{post.excerpt}</p>

                <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
                  Read Article <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className={styles.ctaWrapper}>
          <Button variant="outline" size="lg" href="/blog">
            Explore the Journal
          </Button>
        </div>
      </div>
    </section>
  );
};
