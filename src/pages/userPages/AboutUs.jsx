import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Heart, Star, Zap } from 'lucide-react';
import picture from '@/components/images/sos2.jpg';

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

const flameVariants = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

function AboutUs() {
  return (
    <motion.section 
      className="relative justify-center min-h-full overflow-hidden bg-neutral"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-20 h-20 rounded-full top-25 left-15 animate-pulse bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute w-12 h-12 delay-500 rounded-full bottom-55 left-20 animate-pulse bg-gradient-to-br from-orange-200 to-red-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        ></motion.div>
        <motion.div
          className="absolute w-16 h-16 delay-1000 rounded-full top-45 right-20 animate-pulse bg-gradient-to-br from-red-200 to-pink-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center pb-30 md:px-6 lg:px-8">

        <motion.div className="flex items-center justify-center py-10 mb-4" variants={itemVariants}>
          <motion.div variants={flameVariants} animate="bounce">
            <Flame className="w-8 h-8 mr-2 text-red-500" />
          </motion.div>
          <h1 className="text-3xl font-heading text-content md:text-5xl">
            Who We Are
          </h1>
          <motion.div variants={flameVariants} animate="bounce" transition={{ delay: 0.2 }}>
            <Flame className="w-8 h-8 ml-2 text-orange-500" />
          </motion.div>
        </motion.div>

        <motion.div className="grid items-center gap-10 md:grid-cols-2" variants={containerVariants}>
          {/* Image */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <img
              src={picture}
              alt="About us"
              className="w-full max-w-lg mx-auto transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants}>
            <Card className="transition-all duration-300 border shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl">
              <CardContent className="p-6 space-y-6">
                <motion.p 
                  className="text-lg text-content"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="inline-block w-5 h-5 mr-2 text-red-500" />
                  Alas Deli's Hot Sauce was born during the height of the
                  pandemic—around the first quarter of 2020, when the lockdowns gave
                  us all a moment to pause and reset. Though we had started talking
                  about the business back in 2019, it wasn't until that quiet,
                  uncertain time that things really began to take shape.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-content"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="inline-block w-5 h-5 mr-2 text-yellow-500" />
                  At Alas Deli's, our purpose is to bring a deeper understanding of
                  hot sauces to Filipino homes. We focus not just on the heat but on
                  the stories behind the flavor—the craftsmanship, the variety of
                  chilis, and the culture they represent.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-content"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Star className="inline-block w-5 h-5 mr-2 text-blue-500" />
                  Each bottle we make carries our passion for local ingredients and
                  our belief that food can be a powerful way to connect people. Our
                  goal is simple—to celebrate spice, share stories, and create
                  something that feels truly Filipino.
                </motion.p>
              </CardContent>
            </Card>

            <motion.div 
              className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3"
              variants={containerVariants}
            >
              <motion.div 
                className="p-4 text-center border-2 border-red-200 rounded-lg bg-gradient-to-br from-red-100 to-pink-100"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 text-red-500" />
                  </motion.div>
                </div>
                <h4 className="text-sm font-bold text-black">Handcrafted</h4>
                <p className="mt-1 text-xs text-lighter">
                  Every batch made with care
                </p>
              </motion.div>

              <motion.div 
                className="p-4 text-center border-2 border-yellow-200 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </div>
                <h4 className="text-sm font-bold text-black">Local Ingredients</h4>
                <p className="mt-1 text-xs text-lighter">
                  Supporting Filipino farmers
                </p>
              </motion.div>

              <motion.div 
                className="p-4 text-center border-2 border-green-200 rounded-lg bg-gradient-to-br from-green-100 to-teal-100"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="w-6 h-6 text-green-500" />
                  </motion.div>
                </div>
                <h4 className="text-sm font-bold text-black">Authentic Flavors</h4>
                <p className="mt-1 text-xs text-lighter">
                  True Filipino taste
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutUs;