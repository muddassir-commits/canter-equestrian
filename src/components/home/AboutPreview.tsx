'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './AboutPreview.module.css';

export const AboutPreview: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20, duration: 0.8 },
    },
  } as const;

  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20, duration: 0.8 },
    },
  } as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Side: Large image wrapper */}
          <motion.div className={styles.imageCol} variants={imageVariants}>
            <div className={styles.imageInner}>
              <Image
                src="/images/about/workshop.png"
                alt="Artisan hand-stitching premium leather"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                loading="lazy"
              />
            </div>
            {/* Overlay tag */}
            <div className={styles.badgeCard}>
              <span className={styles.badgeNumber}>100%</span>
              <span className={styles.badgeLabel}>Handcrafted Leather</span>
            </div>
          </motion.div>

          {/* Right Side: Copywriting */}
          <motion.div className={styles.textCol} variants={textVariants}>
            <SectionHeading
              eyebrow="Our Craftsmanship"
              title="Indian Heritage, Global Quality"
              align="left"
              className={styles.heading}
            />
            
            <p className={styles.paragraph}>
              At Canter Equestrians, we believe that every ride is a partnership based on trust. Our tack is designed to support that connection. We source the finest full-grain leather and pair it with solid brass hardware to create gear that is as durable as it is beautiful.
            </p>
            
            <p className={styles.paragraph}>
              Every piece is hand-cut, hand-stitched, and hand-finished by master artisans in India, carrying forward generations of craftsmanship to riders across the globe.
            </p>

            <div className={styles.ctaWrapper}>
              <Button variant="outline" size="md" href="/about">
                Discover Our Process
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
