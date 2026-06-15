'use client';
import React from 'react';
import Image from 'next/image';
import { Instagram } from '@/components/ui/SocialIcons';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/constants';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './InstagramFeed.module.css';

const feedImages = [
  '/images/products/bridle.png',
  '/images/products/halter.png',
  '/images/products/reins.png',
  '/images/products/saddle-pad.png',
  '/images/about/workshop.png',
  '/images/hero/hero-shop.png',
];

export const InstagramFeed: React.FC = () => {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  } as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow="Social Stream"
          title="Follow Our Journey"
          subtitle={`Connect with us on Instagram ${SITE_CONFIG.instagram} for daily inspiration, behind-the-scenes peaks, and customer highlights.`}
        />
      </div>

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {feedImages.map((src, index) => (
          <motion.a
            key={index}
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.gridItem}
            variants={itemVariants}
          >
            <div className={styles.imageInner}>
              <Image
                src={src}
                alt="Canter Equestrian Instagram Post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <Instagram size={24} className={styles.icon} />
                <span className={styles.overlayText}>View Post</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};
