import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/utils/questions';
import { Minus, Plus } from 'lucide-react';

function Faqs() {
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(questions.map((category) => new Array(category.questions.length).fill(false)));

  const toggleQuestion = (catIndex, questionIndex) => {
    setShow((prevShow) =>
      prevShow.map((cat, i) => (i === catIndex ? cat.map((val, j) => (j === questionIndex ? !val : val)) : cat))
    );
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
    },
  };

  return (
    <section className="bg-neutral min-h-screen pb-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 pb-10">
          <h1 className="font-heading text-3xl font-semibold">Frequently Asked Questions</h1>
          <p className="text-lighter text-lg">Find answers to common questions about our products and services</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="md:w-1/4">
            <div className="md:overflow-x-none flex space-x-2 overflow-x-auto pb-2 md:flex-col md:space-y-2 md:space-x-0">
              {questions.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-content flex-shrink-0 rounded-2xl p-3 text-left font-medium whitespace-nowrap md:p-4 ${
                    activeTab === index ? 'bg-primary text-white' : 'hover:bg-primary/50'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            className="md:w-3/4"
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 gap-4">
              {questions[activeTab].questions.map((question, qIndex) => (
                <motion.div
                  key={qIndex}
                  className="bg-card cursor-pointer rounded-2xl border"
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleQuestion(activeTab, qIndex)}
                  layout
                >
                  <article className="flex items-center justify-between rounded-2xl p-4">
                    <h3 className="font-medium">{question.question}</h3>
                    <div className="text-primary">{show[activeTab][qIndex] ? <Minus /> : <Plus />}</div>
                  </article>
                  <AnimatePresence>
                    {show[activeTab][qIndex] && (
                      <motion.article
                        className="border-primary overflow-hidden border-t-2 p-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        {question.answer}
                      </motion.article>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Faqs;

/*   

  const featuredProducts = [
    {
      name: 'Carbon',
      desc: 'Perfect balance of sweet and heat.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445989/122179467_192071712292847_9036583728645172047_n_zwhbth.jpg',
      link: '/products/sweet-chili',
      tag: 'BESTSELLER',
      tagColor: 'bg-orange-500',
    },
    {
      name: 'Alas Powders',
      desc: 'Creamy and savory favorite.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg',
      link: '/products/garlic-mayo',
      tag: 'NEW',
      tagColor: 'bg-green-500',
    },
    {
      name: 'Classic Sauces',
      desc: 'Smoky and rich in flavor.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445522/122462317_192071598959525_4825425067991163101_n_yh2sac.jpg',
      link: '/products/bbq',
      tag: 'TRENDING',
      tagColor: 'bg-red-500',
    },
    {
      name: 'Ballad of Q',
      desc: 'A bold kick for any meal.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445445/471449145_1098376664995676_4011717143068015172_n_fmgpvi.jpg',
      link: '/products/spicy-vinegar',
      tag: 'HOT',
      tagColor: 'bg-red-600',
    },
  ];

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-base">Featured Sauces</h2>
            <Link to="/menu" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card
                key={product.name}
                className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`font-heading absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white ${product.tagColor}`}
                  >
                    {product.tag}
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div>
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2 text-sm">{product.desc}</CardDescription>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to={product.link} className="w-full">
                      <Button size="sm" className="w-full">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> 
        */
