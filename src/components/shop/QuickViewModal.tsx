'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import styles from './QuickViewModal.module.css';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setActiveImageIndex(0);
      setIsAdded(false);
    }
  }, [product]);

  // Disable page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as const;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.wrapper}>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className={styles.grid}>
              {/* Product Gallery (Left) */}
              <div className={styles.galleryCol}>
                <div className={styles.mainImageWrapper}>
                  <Image
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.mainImage}
                    priority
                  />
                </div>
                {/* Thumbnails (if multiple images exist, fallback render dot pagination otherwise) */}
                <div className={styles.thumbnails}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        styles.thumbBtn,
                        activeImageIndex === idx && styles.activeThumb
                      )}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery image ${idx + 1}`}
                        width={60}
                        height={60}
                        className={styles.thumbImage}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Content info (Right) */}
              <div className={styles.contentCol}>
                <span className={styles.category}>{product.category}</span>
                <h2 className={styles.title}>{product.name}</h2>

                {/* Rating */}
                <div className={styles.ratingRow}>
                  <StarRating rating={product.rating} size={16} />
                  <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className={styles.priceRow}>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                </div>

                <p className={styles.description}>{product.description}</p>

                {/* Sizes Selector */}
                {product.sizes.length > 0 && (
                  <div className={styles.selectorSection}>
                    <span className={styles.selectorLabel}>Size: {selectedSize}</span>
                    <div className={styles.sizeGrid}>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={cn(
                            styles.sizeBtn,
                            selectedSize === size && styles.activeSize
                          )}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className={styles.actionsRow}>
                  <div className={styles.quantitySection}>
                    <button
                      onClick={handleDecreaseQty}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyVal}>{quantity}</span>
                    <button
                      onClick={handleIncreaseQty}
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    variant="accent"
                    className={styles.cartBtn}
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      'Added to Cart!'
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Add to Cart
                      </>
                    )}
                  </Button>
                </div>

                {/* View Full details Page link */}
                <div className={styles.footerLinkWrapper}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className={styles.fullDetailsLink}
                    onClick={onClose}
                  >
                    View Full Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
