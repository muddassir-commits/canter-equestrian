'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onQuickView }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  if (products.length === 0) {
    return (
      <div className={styles.noResults}>
        <p className={styles.noResultsText}>No products match your filter criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className={styles.gridItem}>
          <ProductCard product={product} onQuickView={onQuickView} />
        </motion.div>
      ))}
    </motion.div>
  );
};
