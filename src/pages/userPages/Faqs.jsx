import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../../questions.js';
import { Minus, Plus } from 'lucide-react';

function Faqs() {
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(
    questions.map((category) =>
      new Array(category.questions.length).fill(false)
    )
  );

  const toggleQuestion = (catIndex, questionIndex) => {
    setShow((prevShow) =>
      prevShow.map((cat, i) =>
        i === catIndex
          ? cat.map((val, j) => (j === questionIndex ? !val : val))
          : cat
      )
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
          <h1 className="font-heading text-3xl">Frequently Asked Questions</h1>
          <p className="text-lighter text-lg">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <div className="flex flex-col space-y-2">
              {questions.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-xl p-4 text-left font-medium ${
                    activeTab === index
                      ? 'bg-primary text-white'
                      : 'text-amber-700 hover:bg-amber-100'
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
                  className="cursor-pointer rounded-xl bg-white"
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleQuestion(activeTab, qIndex)}
                  layout
                >
                  <article className="flex items-center justify-between rounded-xl p-4">
                    <h3 className="font-medium">{question.question}</h3>
                    <div className="text-primary">
                      {show[activeTab][qIndex] ? <Minus /> : <Plus />}
                    </div>
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
