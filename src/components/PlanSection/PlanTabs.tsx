import type { PlanTab } from '../../data/plansData';
import type { PlanCategory } from '../../types/content.types';

interface PlanTabsProps {
  tabs: PlanTab[];
  activeId: PlanCategory;
  onChange: (id: PlanCategory) => void;
}

function PlanTabs({ tabs, activeId, onChange }: PlanTabsProps) {
  return (
    <div
      role="tablist"
      className="mx-auto flex w-auto gap-0.5 rounded-full bg-white/80 p-0.5 md:flex-wrap md:justify-center md:gap-[0.4vw] md:p-[0.4vw]"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
           className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-300 md:px-[1vw] md:py-[0.8vw] md:text-[1.5vw] ${
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