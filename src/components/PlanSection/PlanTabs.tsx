import type { PlanTab } from '../../data/plansData';
import type { PlanCategory } from '../../types/content.types';

// TABS INTERNET / INTERNET+TV / MÓVIL.
// Celular: 3 botones iguales en una fila. PC: pastillas centradas.

interface PlanTabsProps {
  tabs: PlanTab[];
  activeId: PlanCategory;
  onChange: (id: PlanCategory) => void;
}

function PlanTabs({ tabs, activeId, onChange }: PlanTabsProps) {
  return (
    <div
      role="tablist"
      className="grid w-full grid-cols-3 gap-1 rounded-3xl bg-white/80 p-2 text-sm md:flex md:w-auto md:flex-wrap md:justify-center md:gap-2 md:rounded-full md:text-2xl"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-1 py-2 font-medium transition-all duration-300 md:px-10 md:py-3 ${
              isActive ? 'bg-purple text-white' : 'text-dark hover:bg-lavender/60'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default PlanTabs;