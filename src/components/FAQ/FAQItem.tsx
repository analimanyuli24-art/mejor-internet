import type { FAQItem as FAQItemData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';

// UNA PREGUNTA: al hacer clic se abre/cierra la respuesta.
// GUÍA: pregunta text-[clamp(12px,1.1vw,16px)] · respuesta text-[clamp(11px,1vw,14px)]
// BOTÓN: más grande = sube el 24px máximo y el 16px de texto.

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
        className="flex w-full items-center justify-between gap-4 py-2 text-left text-[clamp(12px,1.1vw,16px)] font-semibold md:py-3"
      >
        {item.question}
        <span className={`text-[clamp(16px,1.5vw,22px)] text-purple transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-[clamp(11px,1vw,14px)] leading-relaxed">
            <p>{item.answer}</p>
            <button
              type="button"
              onClick={() => openCallRequest()}
              className="mt-3 rounded-full bg-dark px-[clamp(14px,3vw,24px)] py-[clamp(6px,1.2vw,10px)] text-[clamp(12px,1.1vw,16px)] font-semibold text-white transition duration-300 hover:scale-105 active:scale-95"
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