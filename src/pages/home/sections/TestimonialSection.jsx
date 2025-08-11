import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { motion } from 'framer-motion';
import {
  StarIcon,
  QuoteIcon,
  MessageCircleIcon,
  FlameIcon,
} from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Joshcent Rivera',
      role: 'Food Blogger',
      content:
        'ALAS sauces transformed my cooking! The perfect balance of heat and flavor. I put it on everything from eggs to pizza. My subscribers went crazy for my recipes using these sauces!',
      rating: 5,
      image:
        'https://scontent.fmnl33-4.fna.fbcdn.net/v/t39.30808-1/499242487_660617000298825_7648577276595743173_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFVMLp7n3efWvlPdx2Sa59RFNlDCPQRr8cU2UMI9BGvx8390iWQxCju9JtXs3X0UOBYddi0qBAmchGVPy3ip48K&_nc_ohc=J4f_ClLcm5gQ7kNvwFK6dhs&_nc_oc=AdlslC-aBUnt-uvt0x_xoQI05t6jY_DSNNvZZLzBztjP4LCebXP1yZyAtu1hsvdk2dM&_nc_zt=24&_nc_ht=scontent.fmnl33-4.fna&_nc_gid=nK5XymwElP4AfGmUNn4e9A&oh=00_AfWtZaKccxPBSB5ze5H-lcyebzN-HdTKA2rBGdprqi6ryw&oe=689F96ED',
    },
    {
      name: 'Clark Trogo',
      role: 'Restaurant Owner',
      content:
        "We've been using ALAS hot sauces in our restaurant for 6 months now. Customers keep coming back asking what brand we use. The smoky chipotle is our bestseller!",
      rating: 4,
      image:
        'https://scontent.fmnl25-3.fna.fbcdn.net/v/t39.30808-6/412954468_301070099586852_7104256681861247984_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHWq3RJfdNFuDnP7ybLX-ayZzt3WK3XdvtnO3dYrdd2-0_PHxxXrMDgVKZQtOOSCMpzDRzPsTbcx3nTPCLLcWox&_nc_ohc=s_8gzDbKWN8Q7kNvwGNl-R8&_nc_oc=AdlkOLEdR3F7RVdhGCKQ_DV32kLF89oINOlc4bnlIUlKQceU733dRMSr6Ddw0cCixb8&_nc_zt=23&_nc_ht=scontent.fmnl25-3.fna&_nc_gid=Yk5F13BkijccbX7JT6lN-w&oh=00_AfUUM5E6SKE1a1oftPDzEGLasDTYOOKmgsH1dYwXucLIfw&oe=689F9226',
    },
    {
      name: 'Torogo Guy',
      role: 'Home Cook',
      content:
        "I'm not usually a spicy food person, but the mild options from ALAS have just the right kick. The flavors are so complex - you can tell they use quality ingredients.",
      rating: 5,
      image:
        'https://scontent.fmnl25-6.fna.fbcdn.net/v/t39.30808-6/469044029_532287313131795_586094656816260243_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF_3rx_4DsAwcw-uLlqrPmsHf4i8PXYEa0d_iLw9dgRregXmKDXrGXGI3eMT-TMz7OzPOHKw-ND9qA9Egc4KeUF&_nc_ohc=ovlh9nTZlsQQ7kNvwE2dbvJ&_nc_oc=Adk5ZfQgqx6r5aHAWBplIYebaYDBwds1cdvb9UyQUd6shvMDSujO7FzNpVOfGBcgNHA&_nc_zt=23&_nc_ht=scontent.fmnl25-6.fna&_nc_gid=kfG5MMi-sQD_5tE9LpU5Ug&oh=00_AfXzdCthHU4ISB1jdny6hC6xQ0xYJLD_C_-2lZ8grDqmag&oe=689F8A3E',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gradient-to-br from-orange-100 via-amber-100 to-amber-200 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-200 px-4 py-1.5 text-orange-900">
            <FlameIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Customer Love</span>
          </div>
          <h2 className="font-heading text-content mb-4 text-3xl font-bold md:text-4xl">
            What Our <span className="text-orange-600">Spice Lovers</span> Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Don't just take our word for it - hear from those who've experienced
            the ALAS difference
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-300/30"></div>

              <div className="relative z-10 p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="border-primary h-14 w-14 overflow-hidden rounded-full border-2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-content font-medium">
                      {testimonial.name}
                    </h3>
                    <p className="text-lighter text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <QuoteIcon className="text-primary mb-4 h-6 w-6 opacity-80" />

                <p className="mb-6 text-gray-600">{testimonial.content}</p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="from-primary absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r to-amber-600"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <ShowcaseButton
            size="md"
            icon={<MessageCircleIcon className="h-5 w-5" />}
            className="bg-amber-600 text-white hover:bg-amber-600"
          >
            Leave a Review
          </ShowcaseButton>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
