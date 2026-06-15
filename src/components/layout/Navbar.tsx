'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menus when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          styles.header,
          scrolled && styles.scrolled,
          mobileMenuOpen && styles.menuOpen
        )}
      >
        <div className={cn('container', styles.container)}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <Image
                src="/images/logo.jpeg"
                alt="Canter Equestrians Logo"
                width={48}
                height={48}
                className={styles.logoImage}
                priority
              />
              <div className={styles.logoText}>
                <span className={styles.brandName}>CANTER</span>
                <span className={styles.brandSub}>EQUESTRIANS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => {
                const isDropdown = !!link.children;
                const isActive = pathname === link.href || 
                  (link.children && link.children.some(child => pathname === child.href));

                if (isDropdown) {
                  return (
                    <li
                      key={link.label}
                      className={cn(styles.navItem, styles.hasDropdown)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={cn(styles.navLink, isActive && styles.activeLink)}
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {link.label}
                        <ChevronDown size={14} className={cn(styles.chevron, dropdownOpen && styles.chevronRotated)} />
                      </button>
                      <ul className={cn(styles.dropdownMenu, dropdownOpen && styles.dropdownVisible)}>
                        {link.children?.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={cn(
                                styles.dropdownLink,
                                pathname === child.href && styles.activeDropdownLink
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={link.label} className={styles.navItem}>
                    <Link
                      href={link.href}
                      className={cn(
                        styles.navLink,
                        pathname === link.href && styles.activeLink
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions (Bag + Menu Trigger) */}
          <div className={styles.actions}>
            <Link href="/shop" className={styles.cartIcon} aria-label="View Catalog">
              <ShoppingBag size={20} />
            </Link>

            <button
              className={styles.menuTrigger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
