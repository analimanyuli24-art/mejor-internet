import { heroData } from '../../data/siteData';
import heroImage from '../../assets/images/hero-image.png';
import movilBadge from '../../assets/images/badge-movil.png';
import HeroLeadForm from './HeroLeadForm';

// SECCIÓN INICIAL fluida: todos los textos y burbujas se adaptan al ancho de la pantalla.
// Celular: una columna. PC (lg+): tres columnas.
// GUÍA:
// - TÍTULO: text-[clamp(44px,8vw,108px)] (más grande = sube el 108)
// - SUBTÍTULO: text-[clamp(16px,1.6vw,30px)]
// - ALTURA PC: md:min-h-[860px] · distancia del contenido al borde: md:pb-12
// - BURBUJAS: una sola imagen (badge-movil.png) con las dos burbujas.
// - Posición en celular: top (abajo/arriba) y left (derecha/izquierda) en las clases "relative".

function Hero() {
  return (
    <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden rounded-b-[40px] pb-10 pt-[120px] text-white md:min-h-[860px] md:pb-12 md:pt-[260px]">
      <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="grid grid-cols-1 items-end gap-8 px-[4.3%] md:mt-auto lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
        {/* COLUMNA IZQUIERDA: título, subtítulo y pill */}
        <div className="mb-[clamp(20px,10vw,80px)]">
          <h1 className="text-[clamp(44px,8vw,108px)] font-semibold leading-[0.92] drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
            {heroData.title.map((line) => (
              <span key={line} className="block whitespace-nowrap">{line}</span>
            ))}
          </h1>
          <p className="mt-[clamp(12px,1.5vw,24px)] max-w-lg text-[clamp(16px,1.6vw,30px)] leading-snug">
            {heroData.subtitle}
          </p>
          <div className="mt-[clamp(12px,1.5vw,24px)] inline-flex items-center gap-[clamp(6px,0.6vw,12px)] rounded-full bg-dark px-[clamp(14px,1.2vw,24px)] py-[clamp(7px,0.7vw,12px)] text-[clamp(12px,1.1vw,20px)] font-semibold">
            <span className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)] animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-green" />
            {heroData.liveLabel}
          </div>
        </div>

        {/* COLUMNA CENTRAL: burbujas de precio (una sola imagen) */}
        <div className="relative top-25 left-0 flex items-end justify-center pb-2 md:top-0 md:left-0 md:pb-6">
          <img
            src={movilBadge}
            alt=""
            aria-hidden="true"
            className="w-[clamp(220px,30vw,460px)] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* COLUMNA DERECHA: formulario */}
        <div className="relative top-15 -left-4 flex origin-top scale-90 justify-center md:top-0 md:left-0 md:scale-100 lg:self-center">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}

export default Hero;