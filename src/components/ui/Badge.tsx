import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'primary' | 'accent' | 'success' | 'danger' | 'muted';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', className, children }) => {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};
