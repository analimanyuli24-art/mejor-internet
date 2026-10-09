import type { AdvantageData } from '../../types/content.types';
import ImagePlaceholder from '../ui/ImagePlaceholder';

// UNA VENTAJA: ícono + título morado + texto.
// GUÍA: tamaño del título text-2xl (celular) / md:text-3xl (PC)

interface AdvantageItemProps {
  advantage: AdvantageData;
}

function AdvantageItem({ advantage }: AdvantageItemProps) {
  return (
    <div className="flex flex-col items-center transition duration-300 hover:-translate-y-1">
      {/* TODO: REEMPLAZAR POR ÍCONO -> src/assets/icons/{advantage.iconKey}.svg */}
      <ImagePlaceholder name={advantage.iconKey} className="h-24 w-24" />
      <h3 className="mt-6 text-2xl font-bold text-purple md:text-3xl">{advantage.title}</h3>
      <p className="mt-3 max-w-xs text-base md:text-xl">{advantage.description}</p>
    </div>
  );
}

export default AdvantageItem;