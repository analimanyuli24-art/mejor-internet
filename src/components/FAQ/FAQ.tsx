import { useState } from 'react';
import { faqData } from '../../data/faqData';
import FAQItem from './FAQItem';

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-lavender px-[4.3%] pb-24 pt-14 md:pb-44 md:pt-20">
      <h2 className="text-center text-3xl md:text-5xl">RESOLVEMOS TUS DUDAS</h2>
      <div className="mx-auto mt-14 max-w-6xl">
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