'use client';
import React, { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { QuickViewModal } from '@/components/shop/QuickViewModal';
import { products } from '@/data/products';
import { Product } from '@/types';
import styles from './page.module.css';

export default function ShopPageClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get('category') : null;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Sync category from URL query parameters
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam]);

  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [mobileFilterOpen]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleChangeMaxPrice = (price: number) => {
    setMaxPrice(price);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('');
    setMaxPrice(15000);
    setSortBy('featured');
  };

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Size Filter
    if (selectedSize !== '' && !product.sizes.some(size => size.toLowerCase().includes(selectedSize.toLowerCase()))) {
      return false;
    }
    // Price Filter
    if (product.price > maxPrice) {
      return false;
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // Default featured (original array index)
  });

  return (
    <PageTransition>
      {/* Page Header Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroBackground} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Shop Our Tack</h1>
          <p className={styles.heroSubtitle}>
            Premium handcrafted leather gear, built for performance and comfort.
          </p>
        </div>
      </div>

      <section className={styles.shopSection}>
        <div className="container">
          {/* Mobile Filter Trigger Bar */}
          <div className={styles.mobileBar}>
            <button
              className={styles.filterTrigger}
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className={styles.resultsCount}>
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
            </div>
          </div>

          <div className={styles.layout}>
            {/* Desktop Filter Sidebar */}
            <div className={styles.sidebarWrapper}>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                selectedSize={selectedSize}
                onSelectSize={handleSelectSize}
                maxPrice={maxPrice}
                onChangeMaxPrice={handleChangeMaxPrice}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Mobile Filter Sidebar Drawer */}
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              selectedSize={selectedSize}
              onSelectSize={handleSelectSize}
              maxPrice={maxPrice}
              onChangeMaxPrice={handleChangeMaxPrice}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
              isOpen={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
            />

            {/* Mobile Filter Backdrop Overlay */}
            {mobileFilterOpen && (
              <div
                className={styles.filterBackdrop}
                onClick={() => setMobileFilterOpen(false)}
              />
            )}

            {/* Product Grid Area */}
            <div className={styles.gridWrapper}>
              {/* Desktop Sort Header */}
              <div className={styles.sortHeader}>
                <div className={styles.resultsText}>
                  Showing {sortedProducts.length} of {products.length} products
                </div>
                <div className={styles.sortSelectContainer}>
                  <label htmlFor="sort-by" className={styles.sortLabel}>
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Grid Component */}
              <ProductGrid products={sortedProducts} onQuickView={handleOpenQuickView} />
            </div>
          </div>
        </div>
      </section>

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </PageTransition>
  );
}
