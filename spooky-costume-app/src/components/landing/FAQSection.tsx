import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'q1',
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
    },
    {
      id: 'q2',
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
    },
    {
      id: 'q3',
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
    },
    {
      id: 'q4',
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
    },
    {
      id: 'q5',
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
    },
    {
      id: 'q6',
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer'),
    },
    {
      id: 'q7',
      question: t('faq.q7.question'),
      answer: t('faq.q7.answer'),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-neutral-400">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-neutral-800 border border-neutral-700 rounded-md overflow-hidden transition-all duration-300"
              style={{
                borderColor: openItem === faq.id ? '#5a3d76' : '#242428',
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-neutral-750 transition-colors"
              >
                <span className="font-display font-semibold text-lg text-neutral-100">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                    openItem === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-neutral-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
