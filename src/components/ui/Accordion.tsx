'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './Accordion.module.css';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className={cn(styles.item, isOpen && styles.open)}>
            <button
              className={styles.trigger}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.question}>{item.question}</span>
              <ChevronDown className={cn(styles.icon, isOpen && styles.rotate)} size={18} />
            </button>
            <div className={styles.contentWrapper}>
              <div className={styles.contentInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
