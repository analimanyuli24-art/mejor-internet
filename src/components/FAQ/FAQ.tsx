import { useState } from 'react';
import { faqData } from '../../data/faqData';
import FAQItem from './FAQItem';

// GUÍA: título text-[clamp(18px,2.6vw,34px)] · lista max-w-3xl
// pb = espacio abajo antes del footer (más grande = más separación)

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-lavender px-[4.3%] pb-24 pt-8 md:pb-40 md:pt-12">
      <h2 className="text-center text-[clamp(18px,2.6vw,34px)] font-semibold leading-tight">
        RESOLVEMOS TUS DUDAS
      </h2>
      <div className="mx-auto mt-6 max-w-3xl md:mt-8">
        {faqData.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;