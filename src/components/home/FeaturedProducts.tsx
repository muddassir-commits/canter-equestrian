'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/data/products';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from '../shop/ProductCard';
import { Button } from '../ui/Button';
import styles from './FeaturedProducts.module.css';

export const FeaturedProducts: React.FC = () => {
  const featured = getFeaturedProducts();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  } as const;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Curated Tack"
          title="Our Finest Collection"
          subtitle="Explore our top-rated leather bridles, halters, and reins, trusted by riders around the world."
        />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.ctaWrapper}>
          <Button variant="outline" size="lg" href="/shop">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
