import { advantagesData } from '../../data/advantagesData';
import AdvantageItem from './AdvantageItem';

// VENTAJAS: en celular 2 columnas · en PC 4 columnas.
// TÍTULO: celular 12px · PC md:text-[clamp(24px,3vw,48px)] (más grande = sube el 48)

function Advantages() {
  return (
    <section className="mx-[2%] px-4 py-10 md:py-20">
      <h2 className="text-center text-[12px] font-normal text-purple md:text-[clamp(24px,3.4vw,56px)]">
        NUESTRAS VENTAJAS
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-4 md:gap-x-12 md:gap-y-12">
        {advantagesData.map((advantage) => (
          <AdvantageItem key={advantage.title} advantage={advantage} />
        ))}
      </div>
    </section>
  );
}

export default Advantages;