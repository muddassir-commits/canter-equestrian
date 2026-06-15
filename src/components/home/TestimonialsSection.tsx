'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { SectionHeading } from '../ui/SectionHeading';
import { StarRating } from '../ui/StarRating';
import { cn } from '@/lib/utils';
import styles from './TestimonialsSection.module.css';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Reset/set timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow="Rider Reviews"
          title="What Our Customers Say"
          subtitle="Real reviews from equestrians around the world who have put Canter gear to the test."
        />

        <div 
          className={styles.carouselContainer} 
          onMouseEnter={() => {
            if (timerRef.current) clearInterval(timerRef.current);
          }} 
          onMouseLeave={resetTimer}
        >
          
          {/* Main Slide Card */}
          <div className={styles.carouselWindow}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slideCard}
              >
                <Quote className={styles.quoteIcon} size={40} />
                
                <div className={styles.starsWrapper}>
                  <StarRating rating={currentTestimonial.rating} size={18} />
                </div>
                
                <p className={styles.quoteText}>
                  "{currentTestimonial.text}"
                </p>

                <div className={styles.reviewerInfo}>
                  <span className={styles.name}>{currentTestimonial.name}</span>
                  <span className={styles.location}>{currentTestimonial.location}</span>
                </div>

                <div className={styles.productBadge}>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={currentTestimonial.productImage}
                      alt={currentTestimonial.product}
                      fill
                      sizes="48px"
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productDetails}>
                    <span className={styles.purchasedLabel}>Verified Buyer</span>
                    <span className={styles.productName}>{currentTestimonial.product}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              resetTimer();
              handlePrev();
            }}
            className={cn(styles.navBtn, styles.prevBtn)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => {
              resetTimer();
              handleNext();
            }}
            className={cn(styles.navBtn, styles.nextBtn)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>

          {/* Carousel Dots */}
          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  resetTimer();
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(styles.dot, index === currentIndex && styles.activeDot)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
