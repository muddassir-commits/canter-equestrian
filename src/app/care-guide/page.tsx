import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { careFaqs } from '@/data/faq';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Leather Care & Maintenance Guide',
  description: 'Learn how to clean, condition, and store your handcrafted full-grain leather saddlery, bridles, and reins. Solid brass hardware care tips.',
};

export default function CareGuidePage() {
  const tabsData = [
    {
      label: 'Leather Care',
      id: 'leather-care',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.split}>
            <div className={styles.textContent}>
              <h3 className={styles.tabTitle}>The Golden Rules of Leather Care</h3>
              <p className={styles.tabText}>
                Full-grain leather is a natural, living material. Properly cared for, it adapts to your horse, grows stronger, and develops a beautiful, distinct patina over time. Neglected, it dries out, cracks, and poses safety risks.
              </p>
              <ol className={styles.stepList}>
                <li>
                  <strong>Daily Wipe Down:</strong> After every ride, use a dry or slightly damp microfiber cloth to remove horse sweat, grease, and dirt. Sweat contains salts that dry out leather fibers.
                </li>
                <li>
                  <strong>Monthly Deep Clean:</strong> Apply a glycerin-based saddle soap with a damp sponge in circular motions. Work it into a light lather to lift embedded grime, then wipe off with a clean towel.
                </li>
                <li>
                  <strong>Conditioning:</strong> Once dry, apply a thin layer of natural beeswax-based leather balm or cream. Work it in with a soft cloth to restore moisture and suppleness.
                </li>
                <li>
                  <strong>Natural Drying:</strong> If your tack gets soaked in the rain, let it air-dry slowly at room temperature. Never use radiators, heaters, or direct sunlight, which crack the leather.
                </li>
              </ol>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/blog/leather-care.png"
                  alt="Applying conditioner to leather bridle"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={styles.tabImage}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Hardware Care',
      id: 'hardware-care',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.split}>
            <div className={styles.textContent}>
              <h3 className={styles.tabTitle}>Caring for Solid Brass & Buckles</h3>
              <p className={styles.tabText}>
                We fit only solid brass and high-grade stainless steel buckles and clips to ensure maximum security during rides. Solid brass does not rust, but it will develop a natural antique patina over time.
              </p>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Oxidization Check:</strong> To keep fittings bright and golden, polish them with a brass cleaner (like Brasso). Apply with a cloth, rub gently, and buff to a shine with a clean cloth.
                </li>
                <li>
                  <strong>Protect the Leather:</strong> When polishing metal parts, take care to avoid getting polish on the surrounding leather, as chemicals can dry it out.
                </li>
                <li>
                  <strong>Moving Parts:</strong> Ensure all buckles, snap hooks, and bits move smoothly. Clean out dirt or grit from spring gates regularly.
                </li>
                <li>
                  <strong>Inspection:</strong> Before mounting, inspect all buckle holes and stitching joints to confirm the structural security of your gear.
                </li>
              </ul>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/materials/hardware.png"
                  alt="Solid brass buckle detail on leather strap"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={styles.tabImage}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Storage Tips',
      id: 'storage-tips',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.split}>
            <div className={styles.textContent}>
              <h3 className={styles.tabTitle}>Preserving Shape & Preventing Mold</h3>
              <p className={styles.tabText}>
                How you store your tack is just as important as how you clean it. Improper storage in damp stable lockers is the leading cause of mold, dry rot, and deformed leather headstalls.
              </p>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Hanging Shape:</strong> Always hang your bridles and halters on rounded wood or plastic brackets. Hanging them on thin nails or wires puts creases in the leather crownpieces.
                </li>
                <li>
                  <strong>Ventilation:</strong> Keep tack in a well-ventilated room with relative humidity around 50%. Too dry, and the leather cracks; too damp, and green mold will grow.
                </li>
                <li>
                  <strong>Breathable Covers:</strong> If storing gear for the winter, place them in breathable cotton bags. Never use plastic bags, which trap humidity and breed mold.
                </li>
                <li>
                  <strong>Tension Relief:</strong> Loosen nosebands and throatlatches slightly when hanging to relieve tension on the buckles.
                </li>
              </ul>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/hero/hero-shop.png"
                  alt="Leather tack hanging in a clean stable room"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className={styles.tabImage}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className={styles.pageOffset}>
        
        {/* Hero Header */}
        <div className={styles.heroBanner}>
          <Image
            src="/images/blog/leather-care.png"
            alt="Handcrafted leather care guide background"
            fill
            priority
            quality={80}
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Product Care Guide</h1>
            <p className={styles.heroSubtitle}>
              Learn how to maintain and preserve the safety, comfort, and beauty of your handcrafted tack.
            </p>
          </div>
        </div>

        {/* Tabbed Guide Section */}
        <section className={styles.guideSection}>
          <div className="container">
            <Tabs tabs={tabsData} />
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className={styles.faqSection}>
          <div className="container">
            <SectionHeading
              eyebrow="Common Inquiries"
              title="Care & Warranty FAQ"
              subtitle="Still have questions? Check out our quick answers below or contact our customer support team."
            />
            <div className={styles.accordionWrapper}>
              <Accordion items={careFaqs} />
            </div>

            <div className={styles.ctaWrapper}>
              <p className={styles.ctaText}>Need personalized advice on conditioning your leather tack?</p>
              <Button variant="outline" href="/contact">
                Contact Customer Support
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
