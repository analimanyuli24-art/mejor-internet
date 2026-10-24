import type { FAQItem as FAQItemData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  const { openCallRequest } = useCallRequest();

  return (
    <div className="border-b border-purple/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-2 text-left text-[clamp(12px,1.4vw,20px)] font-semibold md:py-3"
      >
        {item.question}
        <span className={`text-[clamp(16px,1.8vw,26px)] text-purple transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-[clamp(11px,1.3vw,18px)] leading-relaxed">
            <p>{item.answer}</p>
            <button
              type="button"
              onClick={() => openCallRequest()}
              className="mt-3 rounded-full bg-dark px-[clamp(14px,3.5vw,32px)] py-[clamp(6px,1.4vw,12px)] text-[clamp(12px,1.3vw,18px)] font-semibold text-white transition duration-300 hover:scale-105 active:scale-95"
            >
              Solicitar más información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;