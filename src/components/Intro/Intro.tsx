import { introData } from '../../data/siteData';

function Intro() {
  return (
    <section className="mx-[2%] px-4 pt-6 text-center md:pt-[2.5vw]">
      <h2 className="whitespace-nowrap text-[clamp(10px,3.3vw,14px)] font-semibold leading-tight md:text-[2.6vw]">
        {introData.title}
      </h2>
      <p className="mx-auto mt-3 text-[9px] leading-snug md:mt-[1vw] md:text-[max(14px,1.5vw)] lg:text-[max(16px,1.2vw)]">
        {/* CELULAR */}
        <span className="block md:hidden">Deja de pagar de más por tu internet de casa o línea móvil.</span>
        <span className="block md:hidden">Filtramos las mejores opciones del mercado peruano</span>
        <span className="block md:hidden">para que empieces a ahorrar hoy.</span>
        {/* PC */}
        <span className="hidden md:block">Deja de pagar de más por tu internet de casa o línea móvil.</span>
        <span className="hidden md:block">Filtramos las mejores opciones del mercado peruano para que</span>
        <span className="hidden md:block">empieces a ahorrar hoy.</span>
      </p>
    </section>
  );
}

export default Intro;