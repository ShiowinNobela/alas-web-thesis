import { useRef, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { questions } from '../questions.js';

function Faqs() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(
    questions.map((category) =>
      new Array(category.questions.length).fill(false)
    )
  );

  const updateShow = (catIndex, questionIndex) => {
    setShow((prevShow) =>
      prevShow.map((cat, i) =>
        i === catIndex
          ? cat.map((val, j) => (j === questionIndex ? !val : val))
          : cat
      )
    );
  };

  return (
    <section className="min-h-full bg-yellow-100 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-wide uppercase">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <div className="flex flex-col space-y-2">
              {questions.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-lg p-3 text-left font-medium ${
                    activeTab === index
                      ? 'bg-primary text-white'
                      : 'hover:bg-secondary bg-yellow-100 text-gray-700'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="grid grid-cols-1 gap-4">
              {questions[activeTab].questions.map((question, qIndex) => (
                <div key={qIndex} className="rounded-lg bg-white/70 shadow">
                  <article className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{question.question}</h3>
                    <button onClick={() => updateShow(activeTab, qIndex)}>
                      {show[activeTab][qIndex] ? <FaMinus /> : <FaPlus />}
                    </button>
                  </article>
                  {show[activeTab][qIndex] && (
                    <article className="border-t-2 border-gray-500 p-4">
                      {question.answer}
                    </article>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
