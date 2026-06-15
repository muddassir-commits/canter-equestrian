import React from 'react';
import { cn } from '@/lib/utils';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}) => {
  return (
    <div className={cn(styles.wrapper, styles[align], className)}>
      {eyebrow && (
        <span className={cn(styles.eyebrow, light && styles.lightEyebrow)}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(styles.title, light ? styles.lightTitle : styles.darkTitle)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(styles.subtitle, light ? styles.lightSubtitle : styles.darkSubtitle)}>
          {subtitle}
        </p>
      )}
      <div className={cn(styles.divider, light ? styles.lightDivider : styles.darkDivider)} />
    </div>
  );
};
