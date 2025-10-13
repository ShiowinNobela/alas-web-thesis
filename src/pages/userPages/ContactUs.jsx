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
    <motion.section className="min-h-screen bg-neutral" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-20 h-20 rounded-full top-25 left-15 animate-pulse bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute w-16 h-16 delay-1000 rounded-full top-45 right-20 animate-pulse bg-gradient-to-br from-red-200 to-pink-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
        <motion.div
          className="absolute w-12 h-12 delay-500 rounded-full bottom-55 left-20 animate-pulse bg-gradient-to-br from-orange-200 to-red-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        ></motion.div>
      </div>

      {/* Contact Page Content */}
      <main className="relative max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-5xl font-semibold text-content font-heading">Let's Talk Spice!</h1>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-lighter">
            Got burning questions? Need a custom blend that'll knock your socks off? We're here to help you find your
            perfect heat level! 🌶️
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:gap-20" variants={containerVariants}>
          {/* Contact Form */}
          <motion.div variants={itemVariants} whileHover="hover">
            <motion.div variants={cardHoverVariants}>
              <Card className="py-0 transition-all duration-300 border shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl">
                <CardHeader className="py-2 text-white rounded-t-lg bg-primary">
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
                      <Zap className="w-5 h-5 mr-2" />
                    </motion.div>
                    Drop us a Hot Line!
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-lighter">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-lighter">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-lighter">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-1 text-sm font-medium text-lighter">
                      What's cooking?
                    </label>
                    <Input id="subject" placeholder="Custom blend? Wholesale? Just saying hi?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-1 text-sm font-medium text-lighter">
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
                <Card className="transition-all duration-300 border-0 shadow-xl bg-amber-200 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-content dark:text-black">
                      <motion.div
                        animate={{
                          x: [-2, 2, -2],
                          transition: { duration: 3, repeat: Infinity },
                        }}
                      >
                        <MapPin className="w-5 h-5 mr-2 text-red-500" />
                      </motion.div>
                      Come Visit Our Spice Den!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div className="flex items-start p-3 space-x-3 rounded-lg bg-card/70" whileHover={{ x: 5 }}>
                      <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-bold text-content">Alas Delis and Spices</p>
                        <p className="text-sm text-content">Old Balara, Tandang Sora Avenue</p>
                        <p className="text-sm text-content">Quezon City, Philippines</p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center p-3 space-x-3 rounded-lg bg-card/70" whileHover={{ x: 5 }}>
                      <Phone className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-bold text-content">0995 285 8665</p>
                        <p className="text-sm text-content">📞 Call for custom orders & bulk pricing</p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center p-3 space-x-3 rounded-lg bg-card/70" whileHover={{ x: 5 }}>
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-bold text-content">kraffle02@gmail.com</p>
                        <p className="text-sm text-content">⚡ Lightning-fast replies (usually within 2 hours!)</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card className="transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-green-50 to-blue-100 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl dark:text-black">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 4, repeat: Infinity },
                        }}
                      >
                        <Clock className="w-5 h-5 mr-2 text-green-500" />
                      </motion.div>
                      We Accept Walk-Ins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <motion.div
                        className="flex items-center justify-between p-2 rounded bg-white/60"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="font-medium text-lighter dark:text-neutral">Monday - Friday</span>
                        <span className="font-bold text-green-600">9:00 AM - 7:00 PM</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between p-2 rounded bg-white/60"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="font-medium text-lighter dark:text-neutral">Saturday</span>
                        <span className="font-bold text-blue-600">10:00 AM - 6:00 PM</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between p-2 rounded bg-white/60"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="font-medium text-lighter dark:text-neutral">Sunday</span>
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
                className="p-4 border-2 border-red-200 rounded-lg bg-gradient-to-br from-red-100 to-pink-100"
                whileHover={{
                  scale: 1.05,
                  rotate: -1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                  </motion.div>
                  <h4 className="text-sm font-bold dark:text-black">Made with Love</h4>
                </div>
                <p className="text-xs text-lighter dark:text-neutral">
                  Every bottle is crafted by hand with passion and the finest ingredients!
                </p>
              </motion.div>

              <motion.div
                className="p-4 border-2 border-yellow-200 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100"
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { duration: 3, repeat: Infinity },
                    }}
                  >
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  </motion.div>
                  <h4 className="text-sm font-bold dark:text-black">Artisanal Blends</h4>
                </div>
                <p className="text-xs text-lighter dark:text-neutral">
                  Can't find your perfect heat? We'll create a custom sauce just for you!
                </p>
              </motion.div>
            </div>

            {/* Spicy Tip */}
            <motion.div
              className="relative p-6 overflow-hidden border-2 border-orange-300 rounded-xl bg-gradient-to-r from-orange-100 via-red-100 to-pink-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute text-2xl top-2 right-2"
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
              <h3 className="mb-2 text-lg font-bold dark:text-black">🔥 Hot Tip of the Day!</h3>
              <p className="text-sm font-medium text-lighter dark:text-neutral">
                New to spicy food? Start with our "Gentle Fire" blend - it's got all the flavor with just a whisper of
                heat!
              </p>
              <p className="mt-2 text-xs italic text-lighter dark:text-neutral">
                Pro tip: Keep milk handy for your first taste test! 🥛
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.section>
  );
}

export default ContactUs;
