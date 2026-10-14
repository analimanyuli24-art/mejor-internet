import type { AdvantageData } from '../../types/content.types';
import { getIconSrc } from '../../utils/getIconSrc';

// UNA VENTAJA: ícono + título morado + texto.
// CELULAR: ícono 44px · título 10px · texto 9px (sin cambios).
// PC/laptop (md+): ícono clamp(56px,5.2vw,88px) · título clamp(16px,2vw,30px) · texto clamp(12px,1.5vw,20px).

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
          className="h-[44px] w-[44px] object-contain md:h-[clamp(56px,5.2vw,88px)] md:w-[clamp(56px,5.2vw,88px)]"
        />
      )}
      <h3 className="mt-2 text-[10px] font-bold text-purple md:mt-4 md:text-[clamp(16px,2vw,30px)]">{advantage.title}</h3>
      <p className="mt-1 max-w-[130px] text-[9px] leading-snug md:mt-2 md:max-w-sm md:text-[clamp(12px,1.5vw,20px)]">
        {advantage.description}
      </p>
    </div>
  );
}

export default AdvantageItem;