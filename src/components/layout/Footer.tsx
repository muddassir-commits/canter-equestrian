'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Compass } from 'lucide-react';
import { Instagram, Facebook } from '@/components/ui/SocialIcons';

import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';
import { NewsletterForm } from '../ui/NewsletterForm';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Main Footer Content */}
        <div className={styles.topSection}>
          {/* Brand & Tagline */}
          <div className={styles.brandCol}>
            <div className={styles.logoContainer}>
              <Image
                src="/images/logo.jpeg"
                alt="Canter Equestrians Logo"
                width={56}
                height={56}
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.brandName}>CANTER</span>
                <span className={styles.brandSub}>EQUESTRIANS</span>
              </div>
            </div>
            <p className={styles.tagline}>"{SITE_CONFIG.tagline}"</p>
            <div className={styles.socials}>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <Instagram size={20} />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <Facebook size={20} />
              </a>
              <a
                href={SITE_CONFIG.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className={styles.socialLink}
              >
                <Compass size={20} />
              </a>
            </div>
          </div>

          {/* Links Column 1: Shop */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Shop</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Company</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Support */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Support</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterText}>
            <h4 className={styles.newsletterHeading}>Join the Herd</h4>
            <p className={styles.newsletterSub}>
              Subscribe to get exclusive updates, new arrivals, and expert horse care tips.
            </p>
          </div>
          <div className={styles.newsletterFormContainer}>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomSection}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Canter Equestrians. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/shipping" className={styles.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="/shipping" className={styles.bottomLink}>
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className={styles.scrollTopBtn}
              aria-label="Scroll to top of page"
            >
              Back to Top <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
