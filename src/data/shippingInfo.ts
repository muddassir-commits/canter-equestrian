import type { ShippingZone, FAQItem } from '@/types';

export const shippingZones: ShippingZone[] = [
  {
    zone: 'Domestic Metro',
    region: 'India (Metro Cities)',
    delivery: '2-4 business days',
    cost: '₹99',
    freeAbove: '₹2,000',
  },
  {
    zone: 'Domestic Standard',
    region: 'India (Other Regions)',
    delivery: '4-7 business days',
    cost: '₹149',
    freeAbove: '₹3,000',
  },
  {
    zone: 'International Asia',
    region: 'UAE, Singapore, East Asia',
    delivery: '5-9 business days',
    cost: '₹499',
  },
  {
    zone: 'International West',
    region: 'US, UK, European Union',
    delivery: '7-12 business days',
    cost: '₹799',
  },
  {
    zone: 'Rest of World',
    region: 'South America, Africa, Australia',
    delivery: '10-18 business days',
    cost: '₹999',
  },
];

export const shippingFaqs: FAQItem[] = [
  {
    question: 'How long will it take for my order to dispatch?',
    answer: 'Since every item is hand-finished and inspected in our workshop, we typically dispatch orders within 24 to 48 hours of purchase. You will receive an email notification containing your tracking number as soon as the package leaves our facility.',
  },
  {
    question: 'Do you charge customs duties on international shipments?',
    answer: 'For shipments outside India, import duties, customs taxes, or carrier handling fees may be charged by your country of destination. These fees are determined by your local customs office and are the sole responsibility of the customer. Canter Equestrians does not collect or control these fees.',
  },
  {
    question: 'Can I change my shipping address after placing an order?',
    answer: 'If you need to update your shipping address, please contact us immediately at info@cantercompany.com. If the order has not yet been collected by our courier partner, we will update the shipping details for you free of charge. Once dispatched, we are unable to redirect packages.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return window for all unused, undamaged products in their original packaging. If you would like to initiate an exchange or return, please email our support team with your order number. Return shipping charges are borne by the customer unless the item arrived defective.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is handed over to our shipping partner (Bluedart, DHL, or Fedex), a tracking link will automatically be generated and sent to you via email and SMS. You can click that link to see real-time updates of your package status.',
  },
  {
    question: 'What happens if my package is lost or damaged during transit?',
    answer: 'All our shipments are fully insured. If a package is confirmed lost by the shipping carrier or arrives physically damaged, please email us clear photos of the damage immediately. We will initiate a replacement order or process a full refund right away.',
  },
];
