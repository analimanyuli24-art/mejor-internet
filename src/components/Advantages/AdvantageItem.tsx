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
          className="h-[44px] w-[44px] object-contain md:h-[clamp(56px,5.2vw,88px)] md:w-[clamp(56px,5.2vw,88px)] lg:h-[clamp(56px,4.5vw,72px)] lg:w-[clamp(56px,4.5vw,72px)]"
        />
      )}
      <h3 className="mt-2 flex items-center justify-center text-[10px] font-bold text-purple md:mt-4 md:min-h-[2.6em] md:text-[clamp(16px,2vw,30px)] lg:min-h-0 lg:text-[clamp(16px,1.6vw,24px)]">
        {advantage.title}
      </h3>
      <p className="mt-1 max-w-[130px] text-[9px] leading-snug md:mt-2 md:max-w-sm md:text-[clamp(12px,1.5vw,20px)] lg:max-w-xs lg:text-[clamp(12px,1.2vw,16px)]">
        {advantage.description}
      </p>
    </div>
  );
}

export default AdvantageItem;