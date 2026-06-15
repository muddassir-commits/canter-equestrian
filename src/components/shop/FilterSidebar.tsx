'use client';
import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { cn, formatPrice } from '@/lib/utils';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  isOpen?: boolean; // For mobile slide-in
  onClose?: () => void; // For mobile slide-in
}

const SIZES = ['All', 'Pony', 'Cob', 'Full', 'Oversize', 'Standard', 'One Size'];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  maxPrice,
  onChangeMaxPrice,
  sortBy,
  onSortChange,
  onClearFilters,
  isOpen = false,
  onClose,
}) => {
  return (
    <aside className={cn(styles.sidebar, isOpen && styles.mobileOpen)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Sort Section (inside mobile sidebar, hidden on desktop usually but useful here) */}
      <div className={cn(styles.section, styles.mobileOnly)}>
        <h3 className={styles.sectionTitle}>Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.select}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <ul className={styles.list}>
          {CATEGORIES.map((cat) => (
            <li key={cat.value}>
              <button
                className={cn(
                  styles.filterBtn,
                  selectedCategory === cat.value && styles.activeFilter
                )}
                onClick={() => onSelectCategory(cat.value)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price Range</h3>
        <div className={styles.priceContainer}>
          <input
            type="range"
            min="0"
            max="15000"
            step="500"
            value={maxPrice}
            onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
            className={styles.rangeInput}
          />
          <div className={styles.priceLabels}>
            <span>₹0</span>
            <span className={styles.currentPrice}>Up to {formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Size</h3>
        <div className={styles.sizeGrid}>
          {SIZES.map((size) => (
            <button
              key={size}
              className={cn(
                styles.sizeBtn,
                (size === 'All' ? selectedSize === '' : selectedSize === size) && styles.activeSize
              )}
              onClick={() => onSelectSize(size === 'All' ? '' : size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button className={styles.clearBtn} onClick={onClearFilters}>
        Clear All Filters
      </button>
    </aside>
  );
};
