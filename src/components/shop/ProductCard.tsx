'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  className?: string;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  onQuickView,
}) => {
  const { name, slug, price, rating, reviewCount, images, isNew, isBestseller, inStock } = product;

  return (
    <div className={cn(styles.card, className)}>
      {/* Image Container */}
      <div className={styles.imageWrapper}>
        <Link href={`/shop/${slug}`} className={styles.imageLink}>
          <Image
            src={images[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            loading="lazy"
          />
        </Link>

        {/* Status Badges */}
        <div className={styles.badges}>
          {isBestseller && (
            <Badge variant="accent" className={styles.badge}>
              Bestseller
            </Badge>
          )}
          {isNew && (
            <Badge variant="primary" className={styles.badge}>
              New
            </Badge>
          )}
          {!inStock && (
            <Badge variant="muted" className={styles.badge}>
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        {inStock && onQuickView && (
          <button
            className={styles.quickViewBtn}
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${name}`}
          >
            Quick View
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className={styles.details}>
        <span className={styles.category}>{product.category}</span>
        
        <Link href={`/shop/${slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{name}</h3>
        </Link>

        {/* Rating and Reviews count */}
        <div className={styles.ratingRow}>
          <StarRating rating={rating} size={14} />
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>

        {/* Price Row */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(price)}</span>
          {inStock ? (
            <Link
              href={`/shop/${slug}`}
              className={styles.addToCartLink}
              aria-label={`Buy ${name}`}
            >
              <ShoppingBag size={18} />
            </Link>
          ) : (
            <span className={styles.soldOutText}>Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};
