import type { AdvantageData } from '../../types/content.types';
import { getIconSrc } from '../../utils/getIconSrc';

// UNA VENTAJA: ícono + título morado + texto.
// ÍCONO: src/assets/icons/ según advantage.iconKey.
// TAMAÑO DEL ÍCONO: cambia h-[clamp(...)] y w-[clamp(...)].
// TÍTULO: text-2xl (celular) / md:text-3xl (PC)

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
          className="h-[clamp(72px,6vw,96px)] w-[clamp(72px,6vw,96px)] object-contain"
        />
      )}
      <h3 className="mt-6 text-2xl font-bold text-purple md:text-3xl">{advantage.title}</h3>
      <p className="mt-3 max-w-xs text-base md:text-xl">{advantage.description}</p>
    </div>
  );
}

export default AdvantageItem;