'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Hand, Globe } from 'lucide-react';
import { TRUST_ITEMS } from '@/lib/constants';
import styles from './TrustBar.module.css';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Gem: Gem,
  Hand: Hand,
  Globe: Globe,
};

export const TrustBar: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  } as const;

  return (
    <section id="trust-bar" className={styles.trustBar}>
      <div className="container">
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TRUST_ITEMS.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Gem;
            return (
              <motion.div key={index} className={styles.item} variants={itemVariants}>
                <div className={styles.iconWrapper}>
                  <IconComponent size={24} className={styles.icon} />
                </div>
                <span className={styles.label}>{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
