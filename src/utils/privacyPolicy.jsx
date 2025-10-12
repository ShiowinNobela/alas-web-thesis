import { Link } from 'react-router-dom';

export const privacyPolicy = [
  {
    category: 'Introduction',
    content: (
      <div className="space-y-4">
        <p>We value your privacy. This policy explains how we collect, use, disclose, and protect your personal information when you visit or make a purchase from our Platform.</p>
      </div>
    )
  },
  {
    category: 'Information We Collect',
    content: (
      <div className="space-y-4">
        <p><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment details (non-sensitive, such as GCash transaction IDs)</p>
        <p><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, and browsing behavior</p>
        <p><strong>Transaction Data:</strong> Order history, payment method, delivery information, and communication preferences</p>
        <p><strong>Review Content:</strong> Product reviews, ratings, and photos you submit</p>
      </div>
    )
  },
  {
    category: 'How We Use Your Information',
    content: (
      <div className="space-y-4">
        <p>To process, fulfill, and deliver your orders</p>
        <p>To communicate order updates, tracking information, and promotional offers</p>
        <p>To improve our Platform, products, and services through analytics</p>
        <p>To prevent fraud and enhance security</p>
        <p>To comply with legal and regulatory requirements</p>
        <p>To display your reviews (with personal information minimized as needed)</p>
      </div>
    )
  },
  {
    category: 'Data Sharing & Disclosure',
    content: (
      <div className="space-y-4">
        <p>We may share your information with:</p>
        <ul className="pl-5 list-disc">
          <li><strong>Courier Services:</strong> J&T, NinjaVan, LalaMove for delivery purposes</li>
          <li><strong>Payment Processors:</strong> GCash, Maya, banking partners for transaction processing</li>
          <li><strong>Service Providers:</strong> Website hosting, analytics, and customer support tools</li>
          <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights</li>
        </ul>
        <p>We do NOT sell or rent your personal information to third parties for marketing purposes.</p>
      </div>
    )
  },
  {
    category: 'Data Protection & Security',
    content: (
      <div className="space-y-4">
        <p>We implement appropriate technical and organizational security measures</p>
        <p>We use secure protocols for data transmission (HTTPS/SSL)</p>
        <p>We restrict data access to authorized personnel only</p>
        <p>We do not store sensitive payment information like credit card details</p>
        <p>Regular security assessments are conducted</p>
      </div>
    )
  },
  {
    category: 'Contact Us',
    content: (
      <div className="space-y-4">
        <p>For privacy-related questions or data requests:</p>
        <p><strong>Email:</strong> kraffle02@gmail.com</p>
        <p><strong>Facebook:</strong> <Link to="https://www.facebook.com/alas918" className="text-blue-600 underline">https://www.facebook.com/alas918</Link></p>
        <p><strong>Response Time:</strong> We aim to respond within 7 business days</p>
      </div>
    )
  }
];