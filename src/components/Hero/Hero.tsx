import { heroData } from '../../data/siteData';
import heroImage from '../../assets/images/hero-image.png';
import movilBadge from '../../assets/images/badge-movil.png';
import HeroLeadForm from './HeroLeadForm';

// GUÍA:
// - MOVER EL TÍTULO: md:translate-x-[2%] a la derecha · md:-translate-x-[2%] a la izquierda
// - BAJAR/SUBIR EL TÍTULO: md:pt-[30%] (más % = más abajo)
// - TAMAÑO DEL TÍTULO: text-[clamp(40px,6.4vw,92px)]
// - TAMAÑO DE LAS BURBUJAS: w-[clamp(180px,24vw,380px)]
// - ALTO DE LA IMAGEN EN PC: md:h-[85vh]

function Hero() {
  return (
    <div className="bg-white pb-2 md:pb-3">
      <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden rounded-b-[40px] pb-10 pt-[120px] text-white md:h-[85vh] md:min-h-0 md:pb-0 md:pt-0">
        <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

        <div className="grid grid-cols-1 items-end gap-8 px-[4.3%] md:flex-1 md:items-stretch md:py-[3%] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
          {/* COLUMNA IZQUIERDA: título, subtítulo y pill */}
          <div className="mb-[clamp(20px,10vw,80px)] md:mb-0 md:self-start md:pt-[30%] md:translate-x-[2%]">
            <h1 className="text-[clamp(40px,6.4vw,92px)] font-semibold leading-[0.92] drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
              {heroData.title.map((line) => (
                <span key={line} className="block whitespace-nowrap">{line}</span>
              ))}
            </h1>
            <p className="mt-[clamp(12px,1.5vw,24px)] max-w-lg text-[clamp(16px,1.6vw,30px)] leading-snug">
              <span className="block">Accede a tarifas exclusivas</span>
              <span className="block">de Internet y Telefonía.</span>
              </p>
            <div className="mt-[clamp(12px,1.5vw,24px)] inline-flex items-center gap-[clamp(6px,0.6vw,12px)] rounded-full bg-dark px-[clamp(14px,1.2vw,24px)] py-[clamp(7px,0.7vw,12px)] text-[clamp(12px,1.1vw,20px)] font-semibold">
              <span className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)] animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-green" />
              {heroData.liveLabel}
            </div>
          </div>

          {/* COLUMNA CENTRAL: burbujas de precio, abajo en PC */}
          <div className="relative flex items-end justify-center pb-2 md:-top-5 md:left-0 md:self-end md:pb-0 md:-translate-x-[15%]">
            <img
              src={movilBadge}
              alt=""
              aria-hidden="true"
              className="w-[clamp(180px,24vw,380px)] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* COLUMNA DERECHA: formulario, centrado */}
          <div className="relative flex justify-center md:top-15 md:left-0 md:scale-100 md:self-center">
            <HeroLeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;