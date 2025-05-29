import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useState } from "react";
import { questions } from "../questions.js";

function Faqs() {
  const [show, setShow] = useState(new Array(questions.length).fill(false));
  const updateShow = (index) => {
    setShow((prevShow) =>
      prevShow.map((item, i) => (i === index ? !item : item))
    );
  };
  console.log(show);

  return (
    <>
      <section className="bg-yellow-100 bg-cover bg-fixed bg-no-repeat h-screen ">
        <div className="max-w-xl mx-auto pt-35">
          <h1 className="text-center uppercase tracking-wide font-semibold mb-3">
            Frequently Asked Questions
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="border-2 border-gray-500 rounded-lg bg-white shadow-md"
              >
                <article className="flex justify-between items-center p-4">
                  <h1>{question.question}</h1>
                  <ul>
                    <li>
                      <button onClick={() => updateShow(index)}>
                        {show[index] ? <FaMinus /> : <FaPlus />}
                      </button>
                    </li>
                  </ul>
                </article>
                <article
                  className={`${
                    show[index] && "border-t-2 border-gray-500 mt-2 p-4"
                  }`}
                >
                  {show[index] && question.answer}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Faqs;
