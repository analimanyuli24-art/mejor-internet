import { introData } from '../../data/siteData';

// TEXTO INTRODUCTORIO responsive.
// GUÍA: tamaño del título text-[clamp(18px,2.6vw,34px)]
//       (más grande = sube el 34, más chico = baja el 18)
// md:whitespace-nowrap = en tablet y PC el título va en una sola línea.
// md:block = en tablet y PC cada línea del párrafo va en su propia fila.
// Si cambias el texto en siteData, actualiza también estas 3 líneas.

function Intro() {
  return (
    <section className="mx-[2%] px-4 pt-8 text-center md:pt-12">
      <h2 className="mx-auto text-[clamp(18px,2.6vw,34px)] font-semibold leading-tight md:whitespace-nowrap">
        {introData.title}
      </h2>
      <p className="mx-auto mt-4 text-sm md:text-base">
        <span className="md:block">Deja de pagar de más por tu internet de casa o línea móvil.</span>{' '}
        <span className="md:block">Filtramos las mejores opciones del mercado peruano para que</span>{' '}
        <span className="md:block">empieces a ahorrar hoy.</span>
      </p>
    </section>
  );
}

export default Intro;