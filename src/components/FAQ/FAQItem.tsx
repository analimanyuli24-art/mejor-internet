import type { FAQItem as FAQItemData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';
import Button from '../ui/Button';

// UNA PREGUNTA: al hacer clic se abre/cierra la respuesta.
// GUÍA: tamaño de pregunta text-lg (celular) / md:text-2xl (PC).

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
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-semibold md:py-6 md:text-2xl"
      >
        {item.question}
        <span className={`text-3xl text-purple transition-transform duration-300 md:text-4xl ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-base leading-relaxed md:text-xl">
            <p>{item.answer}</p>
            <div className="mt-4">
              <Button variant="dark" size="lg" onClick={() => openCallRequest()}>
                Solicitar más información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;