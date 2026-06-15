import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'outline-light' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, className, children, ...props }, ref) => {
    const combinedClassName = cn(
      styles.button,
      styles[variant],
      styles[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as any}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref as any}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
