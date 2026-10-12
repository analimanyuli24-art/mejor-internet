import type { AdvantageData } from '../../types/content.types';
import { getIconSrc } from '../../utils/getIconSrc';

interface AdvantageItemProps {
  advantage: AdvantageData;
}

function AdvantageItem({ advantage }: AdvantageItemProps) {
  const iconSrc = getIconSrc(advantage.iconKey);

  return (
    <div className="flex flex-col items-center text-center transition duration-300 hover:-translate-y-1">
      {iconSrc && (
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="h-[clamp(56px,4.5vw,72px)] w-[clamp(56px,4.5vw,72px)] object-contain"
        />
      )}
      <h3 className="mt-4 text-[clamp(16px,1.6vw,24px)] font-bold text-purple">{advantage.title}</h3>
      <p className="mt-2 max-w-xs text-[clamp(12px,1.2vw,16px)]">{advantage.description}</p>
    </div>
  );
}

export default AdvantageItem;