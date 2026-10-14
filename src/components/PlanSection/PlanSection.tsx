import { useState } from 'react';
import { plansTabs } from '../../data/plansData';
import type { PlanCategory } from '../../types/content.types';
import PlanTabs from './PlanTabs';
import PlanCard from './PlanCard';

// SECCIÓN "ELIGE TU PRÓXIMO PLAN.".
// CELULAR: una tarjeta a la vez, con flecha. Sin cambios.
// TABLET Y PC (md+): 3 tarjetas en fila, todo en vw sin mínimo ni máximo.

function PlanSection() {
  const [activeId, setActiveId] = useState<PlanCategory>(plansTabs[0].id);
  const [cardIndex, setCardIndex] = useState(0);
  const activeTab = plansTabs.find((tab) => tab.id === activeId) ?? plansTabs[0];
  const total = activeTab.plans.length;

  const handleTab = (id: PlanCategory) => {
    setActiveId(id);
    setCardIndex(0);
  };

  const nextCard = () => setCardIndex((i) => (i + 1) % total);

  return (
    <section className="mx-[2%] mt-8 rounded-[32px] bg-lavender px-4 py-8 shadow-[0_25px_60px_rgba(29,11,51,0.3)] md:mt-[3.5vw] md:rounded-[3.3vw] md:px-[4%] md:py-[3.5vw]">
      <h2 className="text-center text-[clamp(12px,3.6vw,15px)] font-semibold leading-tight text-dark md:text-[2.6vw]">
        ELIGE TU PRÓXIMO PLAN.
      </h2>

      <div className="mt-6 flex justify-center md:mt-[2.1vw]">
        <PlanTabs tabs={plansTabs} activeId={activeId} onChange={handleTab} />
      </div>

      <div key={activeTab.id} className="relative mt-8 md:mt-[3.5vw]">
        <div className="grid grid-cols-1 auto-rows-fr gap-6 animate-[modal-in_0.4s_ease-out] md:grid-cols-3 md:gap-[1.5vw]">
          {activeTab.plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`${index === cardIndex ? 'flex' : 'hidden'} mx-auto w-[60%] md:flex md:mx-0 md:w-full`}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={nextCard}
            aria-label="Siguiente plan"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-3xl leading-none text-white md:hidden"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default PlanSection;