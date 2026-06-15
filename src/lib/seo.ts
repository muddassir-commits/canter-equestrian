import { SITE_CONFIG } from './constants';

/**
 * Returns the Organization JSON-LD schema object.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://${SITE_CONFIG.domain}/#organization`,
    'name': SITE_CONFIG.name,
    'url': `https://${SITE_CONFIG.domain}`,
    'logo': `https://${SITE_CONFIG.domain}/images/logo.jpeg`,
    'sameAs': [
      SITE_CONFIG.instagramUrl,
      SITE_CONFIG.facebookUrl,
      SITE_CONFIG.pinterestUrl
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': SITE_CONFIG.email,
      'contactType': 'customer support'
    }
  };
}

/**
 * Returns the Product JSON-LD schema object.
 */
export function getProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://${SITE_CONFIG.domain}/shop/${product.slug}/#product`,
    'name': product.name,
    'image': `https://${SITE_CONFIG.domain}${product.image}`,
    'description': product.description,
    'sku': `CE-${product.slug.toUpperCase()}`,
    'offers': {
      '@type': 'Offer',
      'url': `https://${SITE_CONFIG.domain}/shop/${product.slug}`,
      'priceCurrency': 'INR',
      'price': product.price,
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': SITE_CONFIG.name
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': product.rating,
      'reviewCount': product.reviewCount
    }
  };
}

/**
 * Returns the BreadcrumbList JSON-LD schema object.
 */
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item.startsWith('http') ? item.item : `https://${SITE_CONFIG.domain}${item.item}`
    }))
  };
}

/**
 * Returns the FAQPage JSON-LD schema object.
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}
