import { advantagesData } from '../../data/advantagesData';
import AdvantageItem from './AdvantageItem';

// VENTAJAS: título y cuadrícula de ventajas.
// Celular: 1 columna · tablet: 2 · PC: 4.

function Advantages() {
  return (
    <section className="mx-[2%] px-4 py-14 md:py-20">
      <h2 className="text-center text-3xl font-normal text-purple md:text-5xl">NUESTRAS VENTAJAS</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
        {advantagesData.map((item) => (
          <AdvantageItem key={item.id} advantage={item} />
        ))}
      </div>
    </section>
  );
}

export default Advantages;