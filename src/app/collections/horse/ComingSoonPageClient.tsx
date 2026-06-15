'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Check, Bell, ArrowRight } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

export default function ComingSoonPageClient() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Set target date to 45 days in the future from now dynamically
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    // Set future date to 45 days from current time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'coming-soon' }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className={styles.wrapper}>
        {/* Background Image with Dark Mask */}
        <div className={styles.background} />
        <div className={styles.overlay} />

        <div className={cn('container', styles.container)}>
          <div className={styles.content}>
            {/* Tag */}
            <div className={styles.badgeWrapper}>
              <Badge variant="accent" className={styles.badge}>
                Launching Soon
              </Badge>
            </div>

            {/* Headers */}
            <h1 className={styles.title}>The Horse Collection</h1>
            <p className={styles.subtitle}>
              Premium equestrian gear, handcrafted for the discerning rider. Something extraordinary is on its way.
            </p>

            {/* Countdown Clock */}
            <div className={styles.countdownGrid}>
              <div className={styles.timeBlock}>
                <span className={styles.timeVal}>
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className={styles.timeLabel}>Days</span>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeBlock}>
                <span className={styles.timeVal}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className={styles.timeLabel}>Hours</span>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeBlock}>
                <span className={styles.timeVal}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className={styles.timeLabel}>Mins</span>
              </div>
              <div className={styles.timeSeparator}>:</div>
              <div className={styles.timeBlock}>
                <span className={styles.timeVal}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className={styles.timeLabel}>Secs</span>
              </div>
            </div>

            {/* Subscription Form */}
            <div className={styles.formContainer}>
              {subscribed ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <Check size={20} />
                  </div>
                  <div className={styles.successText}>
                    <span className={styles.successHeading}>Subscription Confirmed!</span>
                    <span className={styles.successSub}>We'll notify you as soon as the collection drops.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className={styles.form}>
                  <div className={styles.inputContainer}>
                    <input
                      type="email"
                      placeholder="Enter your email for early access"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className={cn(styles.input, error && styles.inputError)}
                      disabled={loading}
                      required
                    />
                    {error && <span className={styles.errorMsg}>{error}</span>}
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Notify Me'}
                  </Button>
                </form>
              )}
            </div>

            {/* Bottom Actions */}
            <div className={styles.actions}>
              <Button variant="outline-light" href="/shop" className={styles.exploreBtn}>
                Explore Shop <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
