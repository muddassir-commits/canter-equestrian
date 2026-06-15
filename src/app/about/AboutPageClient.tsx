'use client';
import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Heart, Compass, CheckCircle } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { STATS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

const steps = [
  {
    num: '01',
    title: 'Responsible Sourcing',
    description: 'We hand-select only the top 5% of full-grain leather hides. Responsibly sourced and inspected for grain quality, consistent thickness, and structural integrity.',
    image: '/images/materials/leather.png',
  },
  {
    num: '02',
    title: 'Ergonomic Design',
    description: 'Every piece is engineered for the animal\'s anatomical comfort. We design wide crownpieces, contoured cheekpieces, and padded contact points to relieve pressure.',
    image: '/images/products/bridle.png',
  },
  {
    num: '03',
    title: 'Hand-Stitched Integrity',
    description: 'Using traditional two-needle saddle stitching, our master artisans sew each seam by hand. This ensures a lock-stitch that will not unravel even under extreme stress.',
    image: '/images/about/workshop.png',
  },
  {
    num: '04',
    title: 'Artisan Conditioning',
    description: 'Before leaving our workshop, each piece is hand-edged, hand-rubbed, and conditioned with premium beeswax and oils to lock in suppleness and moisture.',
    image: '/images/materials/hardware.png',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Uncompromised Quality',
    description: 'No shortcuts, no synthetics. We build equestrian gear that stands the test of time, backed by our lifetime stitching warranty.',
  },
  {
    icon: Heart,
    title: 'Animal Comfort First',
    description: 'We believe premium performance comes from a comfortable horse. Our designs prioritize relief of nerve pressure and friction.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Craft',
    description: 'By preserving traditional leather-crafting techniques, we support and empower master artisans in our local Indian communities.',
  },
];

export default function AboutPageClient() {
  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        
        {/* Section 4.1: Hero */}
        <div className={styles.heroBanner}>
          <Image
            src="/images/about/hero.png"
            alt="Handcrafted leather craftsmanship"
            fill
            priority
            quality={80}
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Our Story</span>
            <h1 className={styles.heroTitle}>Crafted for the Ride</h1>
            <p className={styles.heroSubtitle}>
              Bridging Indian artisanal legacy and global equestrian standards.
            </p>
          </div>
        </div>

        {/* Section 4.2: Origin */}
        <section className={styles.originSection}>
          <div className="container">
            <div className={styles.originGrid}>
              <div className={styles.originText}>
                <SectionHeading
                  eyebrow="The Genesis"
                  title="Where Passion Meets Purpose"
                  align="left"
                  className={styles.originHeading}
                />
                <p className={styles.paragraph}>
                  Canter Equestrians was born out of a simple observations: the bond between a rider and their horse is sacred, yet the market is flooded with mass-produced, synthetic gear that lacks durability, care, and comfort.
                </p>
                <p className={styles.paragraph}>
                  We set out to create a brand that honors this bond. By combining premium full-grain leather, solid brass hardware, and the meticulous care of master Indian leather artisans, we build equestrian tack that feels custom-made for the ride.
                </p>
              </div>
              <div className={styles.quoteCard}>
                <span className={styles.quoteMark}>“</span>
                <blockquote className={styles.quoteBlock}>
                  We don't just manufacture saddlery. We build partnerships between horse and rider, stitch by stitch.
                </blockquote>
                <cite className={styles.quoteAuthor}>— Canter Design Studio</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4.3: Timeline Process */}
        <section className={styles.processSection}>
          <div className="container">
            <SectionHeading
              eyebrow="The Workshop"
              title="Our Craftsmanship Process"
              subtitle="Every Canter piece undergoes a meticulous 4-step creation journey in our workshop."
            />
            
            <div className={styles.timeline}>
              {steps.map((step, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineImageWrapper}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={styles.timelineImage}
                    />
                    <div className={styles.stepNum}>{step.num}</div>
                  </div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4.4: Stats Counters */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              {STATS.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <span className={styles.statValue}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4.5: Core Values */}
        <section className={styles.valuesSection}>
          <div className="container">
            <SectionHeading
              eyebrow="Our Pillars"
              title="Values We Stand By"
              subtitle="Every decision we make, hide we source, and buckle we stamp reflects these core tenets."
            />
            
            <div className={styles.valuesGrid}>
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className={styles.valueCard}>
                    <div className={styles.valueIconCircle}>
                      <Icon size={24} className={styles.valueIcon} />
                    </div>
                    <h3 className={styles.valueTitle}>{val.title}</h3>
                    <p className={styles.valueDesc}>{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4.6: CTA */}
        <section className={styles.ctaSection}>
          <Image
            src="/images/about/hero.png"
            alt="Equestrian stable scenery"
            fill
            quality={80}
            sizes="100vw"
            className={styles.ctaBackgroundImage}
          />
          <div className={styles.ctaOverlay} />
          <div className={cn('container', styles.ctaContainer)}>
            <h2 className={styles.ctaTitle}>Ready to Feel the Difference?</h2>
            <p className={styles.ctaText}>
              Experience tack designed for your horse's ultimate comfort and control.
            </p>
            <Button variant="accent" size="lg" href="/shop">
              Shop the Collection
            </Button>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
