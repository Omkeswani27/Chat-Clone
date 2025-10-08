import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQs = [
  { question: 'What is this chat app?', answer: 'This is a chat app where you can communicate with others.' },
  { question: 'How do I send a message?', answer: 'You can send a message by typing in the chat input and pressing the send button.' },
  { question: 'Can I delete my messages?', answer: 'Yes, you can delete your messages by clicking the delete button next to the message.' },
];

const FAQPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const handleQuestionClick = (index) => {
    setActiveQuestion(index === activeQuestion ? -1 : index);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Frequently Asked Questions</h1>
      <div className="accordion" id="faqAccordion">
        {FAQs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${activeQuestion === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleQuestionClick(index)}
                aria-expanded={activeQuestion === index}
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${activeQuestion === index ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
