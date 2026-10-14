import { heroData } from '../../data/siteData';
import heroImage from '../../assets/images/hero-image.png';
import movilBadge from '../../assets/images/badge-movil.png';
import HeroLeadForm from './HeroLeadForm';

// GUÍA:
// - CELULAR (menos de 768 px): imagen con círculos, y el formulario debajo.
// - TABLET Y PC (768 px o más): todo en vw, formulario en la columna derecha.
// - La imagen siempre mantiene su proporción 1919×820.

function Badge({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-md">
      <img
        src={movilBadge}
        alt=""
        aria-hidden="true"
        className={`absolute top-1/2 h-auto w-[200%] max-w-none -translate-y-1/2 ${side === 'left' ? 'left-0' : 'left-[-100%]'}`}
      />
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-white md:pb-[0.6vw]">
      <section className="relative isolate flex aspect-[1919/820] w-full flex-col justify-center overflow-hidden rounded-b-[24px] px-[4%] text-white shadow-[0_6px_10px_rgba(0,0,0,0.25)] md:rounded-b-[2.1vw] md:px-0 md:shadow-none">
        <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

        <div className="flex items-center justify-between gap-[clamp(8px,2.5vw,24px)] md:grid md:flex-1 md:grid-cols-1 md:items-stretch md:gap-[1.7vw] md:px-[4.3%] md:py-[3%] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-[2vw]">
          {/* COLUMNA IZQUIERDA: título, subtítulo y pill */}
          <div className="min-w-0 flex-1 md:flex-none md:self-start md:pt-[30%] md:translate-x-[2%]">
            <h1 className="text-[clamp(22px,6.2vw,48px)] leading-[0.95] font-semibold drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] md:text-[4.1vw] lg:text-[5.4vw] md:leading-[0.92]">
              {heroData.title.map((line) => (
                <span key={line} className="block whitespace-nowrap">{line}</span>
              ))}
            </h1>
            <p className="mt-[clamp(4px,1.5vw,12px)] text-[clamp(9px,2.6vw,20px)] leading-snug md:mt-[1.5vw] md:text-[1.6vw]">
              <span className="block">Accede a tarifas exclusivas</span>
              <span className="block">de Internet y Telefonía.</span>
            </p>
            <div className="mt-[clamp(4px,1.5vw,12px)] inline-flex items-center gap-[clamp(4px,1.2vw,10px)] rounded-full bg-dark px-[clamp(8px,2.4vw,20px)] py-[clamp(3px,1vw,8px)] text-[clamp(8px,2.3vw,18px)] font-semibold md:mt-[1.5vw] md:gap-[0.6vw] md:px-[1.2vw] md:py-[0.7vw] md:text-[1.1vw]">
              <span className="h-[clamp(5px,1.5vw,12px)] w-[clamp(5px,1.5vw,12px)] animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-green md:h-[0.7vw] md:w-[0.7vw]" />
              {heroData.liveLabel}
            </div>
          </div>

          {/* CÍRCULOS EN CELULAR: uno encima del otro */}
          <div className="flex w-[17%] shrink-0 flex-col gap-[clamp(4px,1.5vw,12px)] md:hidden">
            <Badge side="left" />
            <Badge side="right" />
          </div>

          {/* COLUMNA CENTRAL EN TABLET Y PC: burbujas de precio */}
          <div className="relative hidden shrink-0 items-end justify-center md:flex md:-top-[1vw] md:self-end md:-translate-x-[15%]">
            <img
              src={movilBadge}
              alt=""
              aria-hidden="true"
              className="md:w-[24vw] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* COLUMNA DERECHA EN TABLET Y PC: formulario */}
          <div className="relative hidden justify-center md:flex md:top-[3.1vw] md:left-0 md:scale-100 md:self-center">
            <HeroLeadForm />
          </div>
        </div>
      </section>

      {/* FORMULARIO EN CELULAR: debajo de la imagen */}
      <div className="flex justify-center px-4 pt-6 md:hidden">
        <HeroLeadForm />
      </div>
    </div>
  );
}

export default Hero;