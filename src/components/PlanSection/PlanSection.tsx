import { useState } from "react";
import { plansTabs } from "../../data/plansData";
import type { PlanCategory } from "../../types/content.types";
import PlanTabs from "./PlanTabs";
import PlanCard from "./PlanCard";

function PlanSection() {
  const [activeId, setActiveId] = useState<PlanCategory>(plansTabs[0].id);
  const [cardIndex, setCardIndex] = useState(0);
  const activeTab =
    plansTabs.find((tab) => tab.id === activeId) ?? plansTabs[0];
  const total = activeTab.plans.length;

  const handleTab = (id: PlanCategory) => {
    setActiveId(id);
    setCardIndex(0);
  };

  const nextCard = () => setCardIndex((i) => Math.min(i + 1, total - 1));
  const prevCard = () => setCardIndex((i) => Math.max(i - 1, 0));

  return (
    <section className="relative isolate mx-[2%] mt-8 rounded-[32px] bg-lavender px-4 py-8 shadow-[0_25px_60px_rgba(29,11,51,0.3)] md:mt-[3.5vw] md:rounded-[3.3vw] md:px-[4%] md:py-[3.5vw] md:[zoom:0.7] lg:bg-transparent lg:shadow-none lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:-z-10 lg:before:w-[min(100%,2100px)] lg:before:-translate-x-1/2 lg:before:rounded-[3.3vw] lg:before:bg-lavender lg:before:shadow-[0_25px_60px_rgba(29,11,51,0.3)] lg:before:content-['']">
      <h2 className="text-center text-[clamp(14px,4.2vw,18px)] font-semibold leading-tight text-dark md:text-[2.6vw]">
        ELIGE TU PRÓXIMO PLAN.
      </h2>

      <div className="mt-6 flex justify-center md:mt-[2.1vw]">
        <PlanTabs tabs={plansTabs} activeId={activeId} onChange={handleTab} />
      </div>

      <div key={activeTab.id} className="relative mt-8 md:mt-[3.5vw]">
        <div className="grid grid-cols-1 auto-rows-fr gap-6 animate-[modal-in_0.4s_ease-out] md:grid-cols-3 md:gap-[min(1.5vw,20px)] lg:grid-cols-[repeat(3,490px)] lg:justify-center lg:gap-[60px] pointer-coarse:lg:grid-cols-[repeat(3,minmax(0,1fr))]! pointer-coarse:lg:gap-[min(2vw,32px)]!">
          {activeTab.plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`${index === cardIndex ? "flex" : "hidden"} mx-auto w-[60%] md:flex md:mx-0 md:w-full`}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {cardIndex > 0 && (
          <button
            type="button"
            onClick={prevCard}
            aria-label="Plan anterior"
            className="absolute left-1 top-1/2 -translate-y-1/2 px-2 text-5xl leading-none text-white md:hidden"
          >
            ‹
          </button>
        )}

        {cardIndex < total - 1 && (
          <button
            type="button"
            onClick={nextCard}
            aria-label="Siguiente plan"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2 text-5xl leading-none text-white md:hidden"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default PlanSection;
