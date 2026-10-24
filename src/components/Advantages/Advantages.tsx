import { advantagesData } from '../../data/advantagesData';
import AdvantageItem from './AdvantageItem';

const mobileOrder: Record<string, string> = {
  'Instalación Gratuita': 'max-md:order-1',
  'La fibra más rápida': 'max-md:order-2',
  'Cobertura 5G': 'max-md:order-3',
  'Ahorro garantizado': 'max-md:order-4',
};

function Advantages() {
  return (
    <section className="mx-[2%] px-4 py-10 md:py-20">
      <h2 className="text-center text-[18px] font-normal text-purple md:text-[clamp(23px,3.4vw,35px)]">
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