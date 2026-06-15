'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MapPin, Check, Loader2, ArrowRight } from 'lucide-react';
import { Instagram } from '@/components/ui/SocialIcons';

import { PageTransition } from '@/components/layout/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.enum(['general', 'product', 'order', 'wholesale', 'other'], {
    message: 'Please select an inquiry topic.',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPageClient() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setIsSubmitSuccess(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission.');
    }
  };

  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        <div className="container">
          <SectionHeading
            eyebrow="Get In Touch"
            title="We'd Love to Hear From You"
            subtitle="Questions about sizing, custom fittings, or wholesale? Send us a message and we'll reply within 24 hours."
          />

          <div className={styles.grid}>
            {/* Contact Form Column (Left) */}
            <div className={styles.formCol}>
              {isSubmitSuccess ? (
                <div className={styles.successState}>
                  <div className={styles.successIconCircle}>
                    <Check size={28} />
                  </div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successMessage}>
                    Thank you for reaching out. A member of the Canter team will review your inquiry and get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitSuccess(false)}
                    className={styles.resetBtn}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
                  {submitError && <div className={styles.formAlertError}>{submitError}</div>}

                  {/* Name field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      {...register('name')}
                      className={cn(styles.input, errors.name && styles.inputError)}
                      disabled={isSubmitting}
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
                  </div>

                  {/* Email field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className={cn(styles.input, errors.email && styles.inputError)}
                      disabled={isSubmitting}
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
                  </div>

                  {/* Subject field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Inquiry Topic
                    </label>
                    <select
                      id="subject"
                      defaultValue=""
                      {...register('subject')}
                      className={cn(styles.select, errors.subject && styles.inputError)}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product & Sizing Questions</option>
                      <option value="order">Order Tracking & Support</option>
                      <option value="wholesale">Wholesale & B2B Partnerships</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    {errors.subject && <span className={styles.errorMsg}>{errors.subject.message}</span>}
                  </div>

                  {/* Message field */}
                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Type your message here..."
                      {...register('message')}
                      className={cn(styles.textarea, errors.message && styles.inputError)}
                      disabled={isSubmitting}
                    />
                    {errors.message && <span className={styles.errorMsg}>{errors.message.message}</span>}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className={styles.spinner} size={16} /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info Column (Right) */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Direct Contact</h3>
                <p className={styles.infoCardSub}>
                  Prefer to bypass form submissions? Reach out to us directly through the channels below.
                </p>

                <div className={styles.infoList}>
                  {/* Email */}
                  <div className={styles.infoItem}>
                    <div className={styles.infoIconWrapper}>
                      <Mail size={20} />
                    </div>
                    <div className={styles.infoDetails}>
                      <span className={styles.infoLabel}>Email Support</span>
                      <a href={`mailto:${SITE_CONFIG.email}`} className={styles.infoValue}>
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className={styles.infoItem}>
                    <div className={styles.infoIconWrapper}>
                      <Instagram size={20} />
                    </div>
                    <div className={styles.infoDetails}>
                      <span className={styles.infoLabel}>Instagram DM</span>
                      <a
                        href={SITE_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.infoValue}
                      >
                        {SITE_CONFIG.instagram}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className={styles.infoItem}>
                    <div className={styles.infoIconWrapper}>
                      <MapPin size={20} />
                    </div>
                    <div className={styles.infoDetails}>
                      <span className={styles.infoLabel}>Workshop Location</span>
                      <span className={styles.infoValue}>Kanpur, Uttar Pradesh, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours / Notice */}
              <div className={styles.noticeCard}>
                <h4 className={styles.noticeTitle}>Customer Support Hours</h4>
                <p className={styles.noticeText}>
                  We monitor support emails Monday through Saturday, from 9:00 AM to 6:00 PM IST. We strive to reply to all queries within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
