import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Heart, Zap, Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

function ContactUs() {
  return (
    <motion.section className="bg-neutral min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-25 left-15 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute top-45 right-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-55 left-20 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-red-300 opacity-20 delay-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        ></motion.div>
      </div>

      {/* Contact Page Content */}
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-content font-heading text-5xl font-semibold">Let's Talk Spice!</h1>
          </div>
          <p className="text-lighter mx-auto max-w-3xl text-lg">
            Got burning questions? Need a custom blend that'll knock your socks off? We're here to help you find your
            perfect heat level! 🌶️
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:gap-20" variants={containerVariants}>
          {/* Contact Form */}
          <motion.div variants={itemVariants} whileHover="hover">
            <motion.div variants={cardHoverVariants}>
              <Card className="bg-card/80 border py-0 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-red-500 to-orange-500 py-2 text-white">
                  <CardTitle className="flex items-center text-xl">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                    </motion.div>
                    Drop us a Hot Line!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="text-lighter mb-1 block text-sm font-medium">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-lighter mb-1 block text-sm font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-lighter mb-1 block text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-lighter mb-1 block text-sm font-medium">
                      What's cooking?
                    </label>
                    <Input id="subject" placeholder="Custom blend? Wholesale? Just saying hi?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-lighter mb-1 block text-sm font-medium">
                      Spill the beans! <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your spicy dreams, heat tolerance, or any burning questions..."
                      rows={5}
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full">
                      Send the Heat!
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card className="testimonial-gradient border-0 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-content flex items-center text-xl">
                      <motion.div
                        animate={{
                          x: [-2, 2, -2],
                          transition: { duration: 3, repeat: Infinity },
                        }}
                      >
                        <MapPin className="mr-2 h-5 w-5 text-red-500" />
                      </motion.div>
                      Come Visit Our Spice Den!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div className="bg-card/70 flex items-start space-x-3 rounded-lg p-3" whileHover={{ x: 5 }}>
                      <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-content font-bold">Alas Delis and Spices</p>
                        <p className="text-content text-sm">Old Balara, Tandang Sora Avenue</p>
                        <p className="text-content text-sm">Quezon City, Philippines</p>
                      </div>
                    </motion.div>

                    <motion.div className="bg-card/70 flex items-center space-x-3 rounded-lg p-3" whileHover={{ x: 5 }}>
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-content font-bold">0995 285 8665</p>
                        <p className="text-content text-sm">📞 Call for custom orders & bulk pricing</p>
                      </div>
                    </motion.div>

                    <motion.div className="bg-card/70 flex items-center space-x-3 rounded-lg p-3" whileHover={{ x: 5 }}>
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-content font-bold">kraffle02@gmail.com</p>
                        <p className="text-content text-sm">⚡ Lightning-fast replies (usually within 2 hours!)</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-content flex items-center text-xl">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 4, repeat: Infinity },
                        }}
                      >
                        <Clock className="mr-2 h-5 w-5 text-green-500" />
                      </motion.div>
                      We Accept Walk-Ins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <motion.div
                        className="flex items-center justify-between rounded bg-white/60 p-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-lighter font-medium">Monday - Friday</span>
                        <span className="font-bold text-green-600">9:00 AM - 7:00 PM</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between rounded bg-white/60 p-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-lighter font-medium">Saturday</span>
                        <span className="font-bold text-blue-600">10:00 AM - 6:00 PM</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between rounded bg-white/60 p-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-lighter font-medium">Sunday</span>
                        <span className="font-bold text-purple-600">12:00 PM - 5:00 PM</span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Fun Info Boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                className="rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-100 to-pink-100 p-4"
                whileHover={{
                  scale: 1.05,
                  rotate: -1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-2 flex items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4 text-red-500" />
                  </motion.div>
                  <h4 className="text-content text-sm font-bold">Made with Love</h4>
                </div>
                <p className="text-lighter text-xs">
                  Every bottle is crafted by hand with passion and the finest ingredients!
                </p>
              </motion.div>

              <motion.div
                className="rounded-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-100 to-orange-100 p-4"
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-2 flex items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { duration: 3, repeat: Infinity },
                    }}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  </motion.div>
                  <h4 className="text-content text-sm font-bold">Artisanal Blends</h4>
                </div>
                <p className="text-lighter text-xs">
                  Can't find your perfect heat? We'll create a custom sauce just for you!
                </p>
              </motion.div>
            </div>

            {/* Spicy Tip */}
            <motion.div
              className="relative overflow-hidden rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute top-2 right-2 text-2xl"
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                🌶️
              </motion.div>
              <h3 className="text-content mb-2 text-lg font-bold">🔥 Hot Tip of the Day!</h3>
              <p className="text-lighter text-sm font-medium">
                New to spicy food? Start with our "Gentle Fire" blend - it's got all the flavor with just a whisper of
                heat!
              </p>
              <p className="text-lighter mt-2 text-xs italic">Pro tip: Keep milk handy for your first taste test! 🥛</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.section>
  );
}

export default ContactUs;
