'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Minus, Plus, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { getProductBySlug, products } from '@/data/products';
import { StarRating } from '@/components/ui/StarRating';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/shop/ProductCard';
import { cn, formatPrice } from '@/lib/utils';
import styles from './page.module.css';

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = getProductBySlug(slug);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setActiveImageIdx(0);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) {
    notFound();
  }

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
    }, 1500);
  };

  // Get related products (same category or others, excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Tabs structure
  const tabData = [
    {
      label: 'Description',
      id: 'description',
      content: (
        <div className={styles.tabContent}>
          <p>{product.description}</p>
          <ul className={styles.specList}>
            <li><strong>Material:</strong> {product.material}</li>
            <li><strong>Origin:</strong> Handcrafted in India</li>
            <li><strong>Hardware:</strong> Solid Brass Fitting</li>
            <li><strong>Style:</strong> Premium Equestrian tack</li>
          </ul>
        </div>
      ),
    },
    {
      label: 'Materials & Care',
      id: 'materials-care',
      content: (
        <div className={styles.tabContent}>
          <p>
            We use only the finest full-grain leather for our products. Full-grain leather is the highest grade of leather, retaining the natural grain and strength of the hide.
          </p>
          <ul className={styles.careList}>
            <li>Wipe clean with a damp cloth after each ride to remove dust and sweat.</li>
            <li>Condition monthly with premium leather balm or saddle soap.</li>
            <li>Always allow to dry naturally away from direct sunlight or heat sources.</li>
            <li>Check solid brass fittings periodically and polish if needed.</li>
          </ul>
        </div>
      ),
    },
    {
      label: 'Shipping & Returns',
      id: 'shipping-returns',
      content: (
        <div className={styles.tabContent}>
          <p>
            We ship to over 30 countries globally with secure, tracked logistics.
          </p>
          <ul className={styles.shippingList}>
            <li><strong>Domestic (India):</strong> 3-5 business days (Free over ₹2,000)</li>
            <li><strong>International:</strong> 7-14 business days (Flat rates based on region)</li>
            <li><strong>Returns:</strong> 30-day money-back guarantee on unused items.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/shop" className={styles.breadcrumbLink}>Shop</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>{product.name}</span>
          </nav>

          {/* Main Product Details Split */}
          <div className={styles.detailsSplit}>
            
            {/* Gallery Column (Left) */}
            <div className={styles.galleryCol}>
              <div className={styles.mainImageWrapper}>
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className={styles.mainImage}
                  priority
                />
              </div>
              
              {/* Thumbnails */}
              <div className={styles.thumbnails}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      styles.thumbBtn,
                      activeImageIdx === idx && styles.activeThumb
                    )}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={80}
                      height={80}
                      className={styles.thumbImage}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Column (Right) */}
            <div className={styles.infoCol}>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>

              {/* Rating summary */}
              <div className={styles.ratingRow}>
                <StarRating rating={product.rating} size={18} />
                <span className={styles.reviewsCount}>
                  {product.rating} ★ ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price block */}
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {product.inStock ? (
                  <span className={styles.stockStatus}>✓ In Stock</span>
                ) : (
                  <span className={cn(styles.stockStatus, styles.outOfStock)}>Out of Stock</span>
                )}
              </div>

              <p className={styles.shortDescription}>{product.shortDescription}</p>

              {/* Sizes selector */}
              {product.sizes.length > 0 && (
                <div className={styles.selectorGroup}>
                  <label className={styles.selectorLabel}>Select Size:</label>
                  <div className={styles.sizesList}>
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

              {/* Quantities & Buy Trigger */}
              <div className={styles.actionsRow}>
                <div className={styles.quantitySection}>
                  <button onClick={handleDecreaseQty} className={styles.qtyBtn}>
                    <Minus size={16} />
                  </button>
                  <span className={styles.qtyVal}>{quantity}</span>
                  <button onClick={handleIncreaseQty} className={styles.qtyBtn}>
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="accent"
                  size="lg"
                  className={styles.cartBtn}
                  disabled={!product.inStock || isAdded}
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

              {/* Trust Indicators Column */}
              <div className={styles.trustGrid}>
                <div className={styles.trustItem}>
                  <ShieldCheck size={20} className={styles.trustIcon} />
                  <div className={styles.trustText}>
                    <span className={styles.trustTitle}>Lifetime Warranty</span>
                    <span className={styles.trustSub}>On stitching and solid brass hardware</span>
                  </div>
                </div>
                <div className={styles.trustItem}>
                  <Truck size={20} className={styles.trustIcon} />
                  <div className={styles.trustText}>
                    <span className={styles.trustTitle}>Reliable Logistics</span>
                    <span className={styles.trustSub}>Secure shipping inside India & worldwide</span>
                  </div>
                </div>
                <div className={styles.trustItem}>
                  <RefreshCw size={20} className={styles.trustIcon} />
                  <div className={styles.trustText}>
                    <span className={styles.trustTitle}>Easy Returns</span>
                    <span className={styles.trustSub}>Hassle-free 30-day exchange window</span>
                  </div>
                </div>
              </div>

              {/* Tabs specifications */}
              <div className={styles.tabsSection}>
                <Tabs tabs={tabData} />
              </div>
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>You May Also Like</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
