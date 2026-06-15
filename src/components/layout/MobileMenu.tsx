'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  } as const;

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } },
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Sliding Menu Panel */}
          <motion.div
            className={styles.menuPanel}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.menuInner}>
              <motion.nav
                className={styles.nav}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <ul className={styles.navList}>
                  {NAV_LINKS.map((link) => {
                    const isDropdown = !!link.children;
                    const isActive = pathname === link.href || 
                      (link.children && link.children.some(child => pathname === child.href));

                    if (isDropdown) {
                      return (
                        <motion.li key={link.label} variants={itemVariants} className={styles.navItem}>
                          <span className={styles.categoryTitle}>{link.label}</span>
                          <ul className={styles.subList}>
                            {link.children?.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className={cn(
                                    styles.subLink,
                                    pathname === child.href && styles.activeSubLink
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.li>
                      );
                    }

                    return (
                      <motion.li key={link.label} variants={itemVariants} className={styles.navItem}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            styles.navLink,
                            isActive && styles.activeLink
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              <div className={styles.footer}>
                <span className={styles.tagline}>{SITE_CONFIG.tagline}</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className={styles.email}>
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
