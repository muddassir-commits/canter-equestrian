'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MATERIALS } from '@/lib/constants';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './MaterialsShowcase.module.css';

export const MaterialsShowcase: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  } as const;

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow="The Ingredients"
          title="Premium Materials"
          subtitle="We select only the highest quality materials to ensure the comfort, safety, and longevity of your tack."
        />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {MATERIALS.map((material, index) => (
            <motion.div
              key={index}
              className={styles.cardContainer}
              variants={cardVariants}
            >
              <div className={styles.cardInner}>
                {/* Front Side */}
                <div className={styles.cardFront}>
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.frontOverlay} />
                  <div className={styles.frontTextWrapper}>
                    <h3 className={styles.frontTitle}>{material.title}</h3>
                  </div>
                </div>

                {/* Back Side */}
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <h3 className={styles.backTitle}>{material.title}</h3>
                    <p className={styles.description}>{material.description}</p>
                    <div className={styles.cardAccent} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
