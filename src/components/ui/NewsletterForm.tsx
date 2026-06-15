'use client';
import React, { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('Thank you for subscribing! Welcome to the herd.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      {status === 'success' ? (
        <div className={styles.success}>
          <div className={styles.iconCircle}>
            <Check size={18} className={styles.checkIcon} />
          </div>
          <p className={styles.successText}>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              className={cn(styles.input, status === 'error' && styles.inputError)}
              disabled={status === 'loading'}
              required
            />
            {status === 'error' && <p className={styles.errorMessage}>{message}</p>}
          </div>
          <Button
            type="submit"
            variant="accent"
            disabled={status === 'loading'}
            className={styles.button}
          >
            {status === 'loading' ? (
              <Loader2 className={styles.spinner} size={16} />
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
