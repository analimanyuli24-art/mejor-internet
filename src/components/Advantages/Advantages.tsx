import { advantagesData } from '../../data/advantagesData';
import AdvantageItem from './AdvantageItem';

// VENTAJAS: en celular 2 columnas · en PC 4 columnas.
// ORDEN CELULAR: Instalación, Fibra, Cobertura 5G, Ahorro (solo celular, max-md).
// TÍTULO: celular 12px · PC md:text-[clamp(24px,3.4vw,56px)]

const mobileOrder: Record<string, string> = {
  'Instalación Gratuita': 'max-md:order-1',
  'La fibra más rápida': 'max-md:order-2',
  'Cobertura 5G': 'max-md:order-3',
  'Ahorro garantizado': 'max-md:order-4',
};

function Advantages() {
  return (
    <section className="mx-[2%] px-4 py-10 md:py-20">
      <h2 className="text-center text-[12px] font-normal text-purple md:text-[clamp(24px,3.4vw,56px)]">
        NUESTRAS VENTAJAS
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-4 md:gap-x-12 md:gap-y-12">
        {advantagesData.map((advantage) => (
          <div key={advantage.title} className={mobileOrder[advantage.title] ?? ''}>
            <AdvantageItem advantage={advantage} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Advantages;