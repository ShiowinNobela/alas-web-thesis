import { useState } from 'react';
import { motion } from 'framer-motion';
import { termsAndConditions } from '@/utils/termsAndConditions';

function TermsAndConditions() {
  const [activeTab, setActiveTab] = useState(0);

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
    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
    transition: {
      duration: 0.2,
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-50">
      <div className="max-w-6xl px-4 mx-auto md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 pb-10">
          <h1 className="text-3xl font-semibold text-blue-900 font-heading">Terms & Conditions</h1>
          <p className="text-lg text-blue-700">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
          <div className="md:w-1/4">
            <div className="flex pb-2 space-x-2 overflow-x-auto md:overflow-x-hidden md:flex-col md:space-x-0 md:space-y-2">
              {termsAndConditions.map((section, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-2xl p-3 md:p-4 text-left font-medium whitespace-nowrap flex-shrink-0 ${
                    activeTab === index 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-blue-800 hover:bg-blue-100 border border-blue-200'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.category}
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
            <motion.div
              className="p-6 bg-white border-2 border-blue-300 shadow-lg rounded-2xl"
              whileHover={cardHover}
            >
              <article className="prose max-w-none">
                <h2 className="pb-2 mb-6 text-2xl font-semibold text-blue-800 border-b-2 border-blue-200">
                  {termsAndConditions[activeTab].category}
                </h2>
                <div className="leading-relaxed text-gray-700">
                  {termsAndConditions[activeTab].content}
                </div>
              </article>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TermsAndConditions;