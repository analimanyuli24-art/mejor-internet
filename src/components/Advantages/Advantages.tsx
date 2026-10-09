import { advantagesData } from '../../data/advantagesData';
import AdvantageItem from './AdvantageItem';

// SECCIÓN "NUESTRAS VENTAJAS".
// GUÍA: celular 1 columna · tablet 2 columnas · PC 4 columnas (md+)

function Advantages() {
  return (
    <section className="mx-[2%] px-4 py-14 text-center md:py-20">
      <h2 className="text-3xl font-medium text-purple md:text-5xl">NUESTRAS VENTAJAS</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
        {advantagesData.map((advantage) => (
          <AdvantageItem key={advantage.id} advantage={advantage} />
        ))}
      </div>
    </section>
  );
}

export default Advantages;