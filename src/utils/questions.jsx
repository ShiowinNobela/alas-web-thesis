import { Signature } from 'lucide-react';
import { Link } from 'react-router-dom';

export const questions = [
  {
    category: 'Ordering & Products',
    questions: [
      {
        question: 'How can I place an order online?',
        answer: (
          // sample link
          <p>
            Simply browse the products on the website, add items to the cart,
            and proceed to checkout. You can also{' '}
            <Link to="/ProductListPage" className="text-blue-600 underline">
              visit our Menu page
            </Link>
           {' '} to start shopping right away.
          </p>
        ),
      },
      {
        question: 'Will I receive a confirmation after placing an order?',
        answer:
          'Yes, a confirmation email will be sent once the order is successfully placed and verified.',
      },
      {
        question: 'Can I cancel or modify an order after placing it?',
        answer:
          "Please contact us within 1 hour of placing your order or before it moves to 'Preparing for Shipment' status. You can also contact us through our social media pages if there's a concern you want help with.",
      },
      {
        question: 'How many product variants are available?',
        answer: (
          <p>
            There are over 20 product variants available, depending on the season and crop availability. You can also check our {' '}
            <Link to="/" className="text-blue-600 underline">
              Seasonal Item Selection 
            </Link>
            {' '} Here to know which items are currently available and when will other items will be available.
          </p>
        ),
      },
      {
        question: 'Do you offer bulk orders for gifting or events?',
        answer:
          'Yes, bulk and customized orders can be arranged. Reach out through the contact page for more details.',
      },
      {
        question: 'Can I see the upcoming bazaar locations?',
        answer:
          'Yes, banners and notifications on the website will display upcoming events and stall locations.',
      },
      {
        question: 'Do you offer subscriptions or recurring orders?',
        answer:
          'Not currently, but we are exploring this option! Follow us on social media or sign up for our newsletter to be the first to know when we launch a subscription service.',
      },
      {
        question: 'What are your packaging materials made of?',
        answer:
          'We are committed to sustainability. We use recyclable cardboard and glass jars. Please reuse or recycle where possible!',
      },
    ],
  },
  {
    category: 'Payment Options',
    questions: [
      {
        question: 'What payment methods are accepted?',
        // sample list
        answer: (
          <ul className="pl-5 list-disc">
            <li>GCash</li>
            <li>Maya (QR code)</li>
            <li>Direct bank transfer</li>
            <li>Cash for walk-in customers</li>
          </ul>
        ),
      },
      {
        question: 'Can I change the payment method after placing an order?',
        answer:
          'Unfortunately, once an order is confirmed, the payment method cannot be changed. Canceling and reordering may be necessary.',
      },
      {
        question: 'Can I pay using a credit card or debit card?',
        answer: 'No, we cannot accept credit or debit cards as payment.',
      },
    ],
  },
  {
    category: 'Delivery & Shipping',
    questions: [
      {
        question: 'How do I track my order?',
        answer:
          'After placing an order, a tracking link will be provided. You can check the current delivery status through the online platform.',
      },
      {
        question: 'How long does delivery usually take?',
        answer:
          'Delivery time depends on the location and the selected courier. For nearby areas, same-day delivery may be available.',
      },
      {
        question: 'What are the delivery areas covered?',
        answer:
          'Delivery is available nationwide through couriers like J&T, NinjaVan, and same-day services like LalaMove for local areas.',
      },
      {
        question: 'Can I choose my preferred courier for delivery?',
        answer:
          'Yes, a preferred courier can be selected at checkout, depending on availability in the area.',
      },
      {
        question: 'How are shipping fees calculated?',
        answer:
          'Shipping fees are calculated based on order size, weight, and delivery location. The cost will be displayed before checkout.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Free shipping may be available for minimum purchase amounts or during promotional periods.',
      },
      {
        question:
          'What should I do if my order hasn’t arrived on the expected delivery date?',
        answer:
          'Check the order tracking link provided in the confirmation email or message. If there’s no update or delay, contact support to get assistance and coordinate with the courier service if needed.',
      },
      {
        question: 'Do you deliver on weekends/holidays',
        answer:
          'This depends on our courier schedules. Delivery attempts are typically made everyday. You will be notified by the courier or by us if there will be delays and delivery is available in your area.',
      },
    ],
  },
  {
    category: 'Issues, Refunds & Returns',
    questions: [
      {
        question: 'What happens if a product is damaged during delivery?',
        answer:
          'If an item arrives damaged, a replacement will be arranged using an alternative delivery service at no extra cost.',
      },
      {
        question: 'What should I do if I receive the wrong item?',
        answer:
          'Contact support immediately with a photo of the incorrect item. A replacement will be arranged at no extra cost.',
      },
      {
        question: 'Can I request a refund for a damaged item?',
        answer:
          'Refunds are possible for items damaged in transit, especially if a replacement is not available. You will receive an email confirmation once the refund has been initiated',
      },
      {
        question: 'How long do refunds usually take to process?',
        answer:
          'Refunds are typically processed within 5–7 business days after confirmation, depending on the payment method used.',
      },
    ],
  },
  {
    category: 'Bazaars & Events',
    questions: [
      {
        question: 'Do prices at bazaars match the online prices?',
        answer:
          'Prices can change depending on the platform you are using, but some promotions or bundle deals may be exclusive to either bazaars or the online store.',
      },
      {
        question: 'Can I order online and pick up at a bazaar?',
        answer:
          'Yes, just select the “Pick-up at Bazaar” option at checkout and choose the event location and date.',
      },
      {
        question: 'Is it possible to reserve products for pick-up at an event?',
        answer:
          'Absolutely. Reserve through the website or social media pages and indicate the event where the item will be picked up.',
      },
      {
        question: "How can I find out which bazaars you'll be attending?",
        answer:
          'A list of upcoming events will be posted on the website banner, event section, and social media platforms.',
      },
      {
        question: 'What happens if I miss picking up my order at the bazaar?',
        answer:
          'The order can be rescheduled for the next event or converted to a delivery order. Additional charges may apply for shipping.',
      },
    ],
  },
  {
    category: 'Accounts & Access',
    questions: [
      {
        question: 'How can I create an account?',
        answer: ( 
        <div>
           <p> Click “Sign Up” on the website and enter the required information. A confirmation email will be sent to verify the registration. or click here {' '} 
            <Link to="/RegPage" className="text-blue-600 underline">Sign Up</Link>
           </p>
           
           </div>
           )
      },
      {
        question: 'What should I do if I forget my password?',
        answer:
          'Use the “Forgot Password” option on the login page. A password reset link will be sent to the registered email.',
      },
    ],
  },
  {
    category: 'Loyalty, Reviews & Feedback',
    questions: [
      {
        question: 'Is there a reward program for frequent buyers?',
        answer:
          'Yes, frequent customers may qualify for rewards such as discounts or “buy five get one free” promos.',
      },
      {
        question: 'How do I join the loyalty program?',
        answer:
          "It's automatic! Create an account and start purchasing. You can earn vouchers on hitting milestones, which you can redeem on future orders. You can check your vouchers in the cart.",
      },
      {
        question: 'How do I leave a product review?',
        // Full jsx sample (icons, images, text colors)
        answer: (
          <div className="space-y-3">
            <p>
              After receiving the order, customers can leave a review through
              the <strong>order history</strong> page or on the product’s
              listing page.
            </p>

            <div className="flex items-center gap-2 text-green-600">
              <Signature className="w-5 h-5" />
              <span>
                Verified purchase reviews are marked with a check icon.
              </span>
            </div>

            <img
              src="https://preview.redd.it/u7lozj3xywo91.jpg?width=1080&crop=smart&auto=webp&s=3031b3dd9263f0cc01ccf4c567d5fb73373da915"
              alt="Review screenshot"
              className="border rounded"
            />
          </div>
        ),
      },
      {
        question: 'Why is customer feedback important to your business?',
        answer:
          'Feedback helps improve the product and service quality, and good reviews assist others in making informed purchase decisions.',
      },
    ],
  },
  {
    category: 'Product Quality & Sourcing',
    questions: [
      {
        question: 'How fresh are your products? / What is your shelf life?',
        answer: 'Our products are made in small batches weekly. We recommend consuming them within [X] days for optimal freshness. Each jar is labeled with a "Best Before" date.'
      },
      {
        question: 'Are your ingredients locally sourced?',
        answer:
          'Yes, we prioritize working with local farmers and suppliers to ensure freshness and support our community. We source our raw materials from [Region/Farm].',
      },
    ],
  },
  {
    category: 'Contact & Support',
    questions: [
      {
        question: "What's the best way to contact customer service?",
        answer: (
          <div>
            <p>
              For the fastest response, please message us on our official Facebook Page or Instagram account
            </p>
            <a href="https://www.facebook.com/alas918" className="text-blue-600 underline">
              https://www.facebook.com/alas918
            </a>
            <p>
              You can also email us at [email@address.com]. Our team typically responds within 24 hours on business days.
            </p>
          </div>
        )
      },
      {
        question: 'What are your customer service hours',
        answer:
          'Our online support team is available from 8 AM - 10 PM, Monday to Sunday, excluding public holidays.',
      },
    ],
  },

];
