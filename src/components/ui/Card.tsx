import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

interface CardProps {
  className?: string;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, hoverEffect = true, children }) => {
  return (
    <div className={cn(styles.card, hoverEffect && styles.hover, className)}>
      {children}
    </div>
  );
};
