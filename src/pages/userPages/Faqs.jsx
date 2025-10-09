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
    <section className="min-h-screen bg-neutral pb-50">
      <div className="max-w-6xl px-4 mx-auto md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 pb-10">
          <h1 className="text-3xl font-semibold font-heading">Frequently Asked Questions</h1>
          <p className="text-lg text-lighter">Find answers to common questions about our products and services</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
          <div className="md:w-1/4">
            <div className="flex pb-2 space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-2">
              {questions.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-content rounded-2xl p-3 md:p-4 text-left font-medium whitespace-nowrap flex-shrink-0 ${
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
                  className="border cursor-pointer bg-card rounded-2xl"
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleQuestion(activeTab, qIndex)}
                  layout
                >
                  <article className="flex items-center justify-between p-4 rounded-2xl">
                    <h3 className="font-medium">{question.question}</h3>
                    <div className="text-primary">{show[activeTab][qIndex] ? <Minus /> : <Plus />}</div>
                  </article>
                  <AnimatePresence>
                    {show[activeTab][qIndex] && (
                      <motion.article
                        className="p-4 overflow-hidden border-t-2 border-primary"
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
