'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './HeroBanner.module.css';

export const HeroBanner: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  } as const;

  const handleScrollDown = () => {
    const nextSection = document.getElementById('trust-bar');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Image Container with Gradient Overlay */}
      <Image
        src="/images/hero/hero-main.png"
        alt="Majestic horse wearing premium leather bridle"
        fill
        priority
        quality={85}
        sizes="100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />

      <div className="container">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrow} variants={itemVariants}>
            Canter Equestrians
          </motion.span>
          
          <motion.h1 className={styles.heading} variants={itemVariants}>
            Crafted for the Ride.
          </motion.h1>
          
          <motion.p className={styles.subtext} variants={itemVariants}>
            Premium handcrafted equestrian gear — built with passion, worn with pride.
          </motion.p>
          
          <motion.div className={styles.ctas} variants={itemVariants}>
            <Button variant="accent" size="lg" href="/shop">
              Shop Collection
            </Button>
            <Button variant="outline-light" size="lg" href="/about">
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        className={styles.scrollDown}
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-label="Scroll down to content"
      >
        <span className={styles.scrollText}>Discover More</span>
        <ArrowDown size={18} className={styles.scrollIcon} />
      </motion.button>
    </section>
  );
};
