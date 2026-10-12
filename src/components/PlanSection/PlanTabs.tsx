import type { PlanTab } from '../../data/plansData';
import type { PlanCategory } from '../../types/content.types';

// TABS INTERNET / INTERNET+TV / MÓVIL.
// Celular: 3 botones iguales en una fila. PC: pastillas centradas.
// GUÍA: texto text-[clamp(11px,1.5vw,20px)] (más grande = sube el 20, más chico = baja el 11)

interface PlanTabsProps {
  tabs: PlanTab[];
  activeId: PlanCategory;
  onChange: (id: PlanCategory) => void;
}

function PlanTabs({ tabs, activeId, onChange }: PlanTabsProps) {
  return (
    <div
      role="tablist"
      className="grid w-full grid-cols-3 gap-1 rounded-full bg-white/80 p-[clamp(3px,0.4vw,8px)] md:flex md:w-auto md:flex-wrap md:justify-center md:gap-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-[clamp(2px,1vw,40px)] py-[clamp(6px,0.8vw,12px)] text-[clamp(11px,1.5vw,20px)] font-medium transition-all duration-300 ${
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