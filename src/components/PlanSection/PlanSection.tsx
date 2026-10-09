import { useState } from 'react';
import { plansTabs } from '../../data/plansData';
import PlanTabs from './PlanTabs';
import PlanCard from './PlanCard';

// SECCIÓN "ELIGE TU PRÓXIMO PLAN.": panel lavanda con esquinas redondas y sombra.
// GUÍA: esquinas md:rounded-[64px] (más = más redondo) · sombra shadow-[...]
// Celular: 1 columna · tablet: 2 columnas · PC: 3 columnas (xl+)

function PlanSection() {
  const [activeId, setActiveId] = useState(plansTabs[0].id);
  const activeTab = plansTabs.find((tab) => tab.id === activeId) ?? plansTabs[0];

  return (
    <section className="mx-[2%] mt-10 rounded-[40px] bg-lavender px-3 py-10 shadow-[0_25px_60px_rgba(29,11,51,0.3)] md:mt-16 md:rounded-[64px] md:px-[4%] md:py-16">
      <h2 className="text-center text-3xl font-bold text-dark md:text-5xl">ELIGE TU PRÓXIMO PLAN.</h2>

      <div className="mt-6 flex justify-center md:mt-10">
        <PlanTabs tabs={plansTabs} activeId={activeId} onChange={setActiveId} />
      </div>

      {/* key hace que las tarjetas se re-animen al cambiar de tab */}
      <div
        key={activeTab.id}
        className="mt-10 grid grid-cols-1 gap-6 animate-[modal-in_0.4s_ease-out] md:mt-16 md:grid-cols-2 xl:grid-cols-3"
      >
        {activeTab.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

export default PlanSection;