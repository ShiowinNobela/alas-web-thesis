import { Link } from 'react-router-dom';

export const termsAndConditions = [
  {
    category: 'Definitions & Interpretation',
    content: (
      <div className="space-y-4">
        <p><strong>"Platform"</strong> refers to Alas Hotsauce's website and services</p>
        <p><strong>"Customer," "You," "Your"</strong> refers to the user accessing or purchasing from our Platform</p>
        <p><strong>"Products"</strong> refers to goods available for purchase</p>
        <p><strong>"Content"</strong> includes text, images, logos, and other materials on our Platform</p>
      </div>
    )
  },
  {
    category: 'Eligibility & Account Registration',
    content: (
      <div className="space-y-4">
        <p>You must be at least 18 years old or have parental consent to use our services</p>
        <p>Account registration requires accurate and complete information</p>
        <p>You are responsible for maintaining account confidentiality and all activities under your account</p>
        <p>We reserve the right to suspend or terminate accounts that provide false information or violate these Terms</p>
      </div>
    )
  },
  {
    category: 'Ordering & Products',
    content: (
      <div className="space-y-4">
        <p><strong>Placing Orders:</strong> Orders are placed by adding products to your cart and completing the checkout process.</p>
        <p><strong>Order Confirmation:</strong> You will receive an email confirmation once your order is successfully placed and verified. <em>// Subject to Change</em></p>
        <p><strong>Modifications & Cancellations:</strong> Order modifications or cancellations are only accepted within 1 hour of placement or before the order status changes to 'Preparing for Shipment.' Please contact us via our official social media pages or email for assistance.</p>
        <p><strong>Product Availability:</strong> We offer over 20 product variants, though availability depends on season and crop yields. We reserve the right to limit quantities or discontinue products at any time.</p>
        <p><strong>Bulk & Custom Orders:</strong> Bulk orders for gifting or events can be arranged. Please contact us for details.</p>
        <p><strong>Packaging:</strong> We use sustainable, recyclable materials (cardboard and glass jars) and encourage reuse or recycling.</p>
      </div>
    )
  },
  {
    category: 'Pricing & Payment',
    content: (
      <div className="space-y-4">
        <p><strong>Currency:</strong> All prices are in Philippine Peso (PHP) and include applicable taxes unless stated otherwise.</p>
        <p><strong>Accepted Methods:</strong></p>
        <ul className="pl-5 list-disc">
          <li>GCash</li>
          <li>Maya (via QR code)</li>
          <li>Direct Bank Transfer</li>
          <li>Cash (for walk-in customers only)</li>
        </ul>
        <p><strong>Credit/Debit Cards:</strong> We do not currently accept credit or debit card payments.</p>
        <p><strong>Payment Security:</strong> We prioritize your security and do not store sensitive payment information like credit card details on our servers.</p>
        <p><strong>Payment Method Changes:</strong> The payment method cannot be changed after an order is confirmed. Canceling and reordering may be required.</p>
        <p><strong>Pricing Errors:</strong> We reserve the right to cancel orders containing pricing errors, even after confirmation.</p>
      </div>
    )
  },
  {
    category: 'Shipping & Delivery',
    content: (
      <div className="space-y-4">
        <p><strong>Delivery Areas:</strong> We deliver nationwide via partners like J&T, NinjaVan, and LalaMove. Area's near Quezon City are only available for same-day delivery.</p>
        <p><strong>Courier Selection:</strong> You may select your preferred courier at checkout, subject to availability. <em>// Subject for change</em></p>
        <p><strong>Shipping Fees:</strong> Calculated based on order size, weight, and destination. The final cost is displayed before checkout. <em>// Subject for change</em></p>
        <p><strong>Free Shipping:</strong> May be offered during promotions or for minimum purchase amounts.</p>
        <p><strong>Delivery Time:</strong> Varies by location and courier. Same-day delivery may be available for nearby areas.</p>
        <p><strong>Tracking:</strong> A tracking link is provided after order confirmation.</p>
        <p><strong>Delays:</strong> We are not liable for delays caused by couriers, weather, or other external factors. If your order hasn't arrived by the expected date, check your tracking link or contact support.</p>
        <p><strong>Weekend/Holiday Delivery:</strong> Dependent on courier availability. You will be notified of any delays.</p>
        <p><strong>Failed Delivery:</strong> Additional fees may apply for re-delivery attempts due to incorrect address or recipient unavailability.</p>
      </div>
    )
  },
  // Add more categories as needed
  {
    category: 'Returns, Refunds & Exchanges',
    content: (
      <div className="space-y-4">
        <p><strong>Damaged or Incorrect Items:</strong> Contact us within 48 hours of delivery with photo proof. We will arrange a replacement via an alternative delivery service at no extra cost.</p>
        <p><strong>Refunds:</strong> Available for items damaged in transit, especially if a replacement isn't possible. Refunds are processed within 5-7 business days after confirmation, depending on your payment method.</p>
        <p><strong>Request Denial:</strong> We reserve the right to deny refund or replacement requests that do not meet our guidelines or are made after the 48-hour window.</p>
      </div>
    )
  },
  {
    category: 'Contact Information',
    content: (
      <div className="space-y-4">
        <p>For inquiries or support:</p>
        <p><strong>Email:</strong> kraffle02@gmail.com</p>
        <p><strong>Facebook:</strong> <Link to="https://www.facebook.com/alas918" className="text-blue-600 underline">https://www.facebook.com/alas918</Link></p>
        <p><strong>Support Hours:</strong> 8 AM – 10 PM, Monday to Sunday (except holidays)</p>
      </div>
    )
  }
];