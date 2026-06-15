import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Truck, Gift, ClipboardCheck, CornerDownLeft } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { shippingZones, shippingFaqs } from '@/data/shippingInfo';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Shipping, Delivery & Returns Policy',
  description: 'View our shipping rates, delivery estimates inside India and globally, and learn about our 30-day fit satisfaction guarantee and returns process.',
};

export default function ShippingPage() {
  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        
        {/* Hero Header */}
        <div className={styles.heroBanner}>
          <Image
            src="/images/hero/hero-shop.png"
            alt="Insured shipping and worldwide logistics"
            fill
            priority
            quality={80}
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Shipping & Delivery</h1>
            <p className={styles.heroSubtitle}>
              Fast, secure, and insured logistics. Bringing our premium tack from our Indian workshop to your stable.
            </p>
          </div>
        </div>

        {/* Shipping Zones Table */}
        <section className={styles.zonesSection}>
          <div className="container">
            <SectionHeading
              eyebrow="Delivery Matrix"
              title="Shipping Zones & Rates"
              subtitle="We ship to over 30 countries. Find your country zone below for estimated delivery times and pricing."
            />

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>Regions Covered</th>
                    <th>Delivery Estimate</th>
                    <th>Flat Rate</th>
                    <th>Free Shipping Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, idx) => (
                    <tr key={idx}>
                      <td className={styles.zoneName}>{zone.zone}</td>
                      <td>{zone.region}</td>
                      <td>{zone.delivery}</td>
                      <td className={styles.priceCell}>{zone.cost}</td>
                      <td className={styles.thresholdCell}>
                        {zone.freeAbove ? `Orders over ${zone.freeAbove}` : 'Not available'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How Tracking Works */}
        <section className={styles.trackingSection}>
          <div className="container">
            <SectionHeading
              eyebrow="Order Lifecycle"
              title="How Your Order Travels"
              subtitle="From the moment you click buy, to the moment your horse wears their new gear."
            />

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepIconWrapper}>
                  <ClipboardCheck size={24} />
                </div>
                <h3 className={styles.stepTitle}>1. Preparation</h3>
                <p className={styles.stepDesc}>
                  We pull the product from our stock, apply a final hand-burnish and check, then securely package it with care.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepIconWrapper}>
                  <Truck size={24} />
                </div>
                <h3 className={styles.stepTitle}>2. Secure Transit</h3>
                <p className={styles.stepDesc}>
                  Your order is collected by our courier partners (DHL/Fedex/Bluedart) and fully insured for loss or damage.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepIconWrapper}>
                  <Gift size={24} />
                </div>
                <h3 className={styles.stepTitle}>3. Stable Arrival</h3>
                <p className={styles.stepDesc}>
                  The courier delivers the package directly to your doorstep. Inspect the fit on your horse with peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Returns & Exchanges Info */}
        <section className={styles.returnsSection}>
          <div className="container">
            <div className={styles.returnsGrid}>
              <div className={styles.returnsText}>
                <SectionHeading
                  eyebrow="Easy Returns"
                  title="30-Day Fit & Satisfaction Guarantee"
                  align="left"
                  className={styles.returnsHeading}
                />
                <p className={styles.paragraph}>
                  Getting the perfect fit for your horse is critical for safety and comfort. We know that sizing can sometimes be tricky. That's why we offer a <strong>30-day exchange and return policy</strong>.
                </p>
                <p className={styles.paragraph}>
                  You can try the tack on your clean horse. If the size is incorrect or you are not completely satisfied, we will gladly arrange an exchange or refund. The items must be returned in unused condition, in their original packaging, without sweat marks or scratches.
                </p>
              </div>
              <div className={styles.policyCard}>
                <div className={styles.policyHeader}>
                  <CornerDownLeft className={styles.policyIcon} size={28} />
                  <h3 className={styles.policyTitle}>Return Process</h3>
                </div>
                <ol className={styles.policySteps}>
                  <li>Email info@cantercompany.com with your Order ID.</li>
                  <li>Our team will verify and authorize your return request.</li>
                  <li>Package the unused item securely and ship it back to us.</li>
                  <li>Once received, we dispatch your exchange or process a refund.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping FAQs Accordion */}
        <section className={styles.faqSection}>
          <div className="container">
            <SectionHeading
              eyebrow="Shipping Queries"
              title="Logistics & Returns FAQ"
            />
            <div className={styles.accordionWrapper}>
              <Accordion items={shippingFaqs} />
            </div>

            <div className={styles.supportCta}>
              <p>Have specific customs inquiries or need express overnight shipping inside India?</p>
              <Button variant="outline" href="/contact">
                Contact Logistics Support
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
