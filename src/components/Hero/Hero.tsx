import { heroData } from '../../data/siteData';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import HeroLeadForm from './HeroLeadForm';
import PriceBadge from './PriceBadge';

// SECCIÓN INICIAL responsive.
// Celular: todo en una columna, textos y burbujas más chicos.
// PC (lg+): 3 columnas. En PC el contenido se acomoda desde abajo.
// GUÍA PC:
// - md:pb-20 = distancia del contenido al borde inferior (más = el contenido sube, menos = baja)
// - md:min-h-[960px] = altura total del hero (más = la imagen baja)

function Hero() {
  return (
    <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden rounded-b-[40px] pb-10 pt-[120px] text-white md:min-h-[960px] md:pb-37 md:pt-[260px]">
      {/* TODO: REEMPLAZAR POR IMAGEN DE FONDO -> src/assets/images/hero-image.jpg */}
      <ImagePlaceholder name="hero-image" className="absolute inset-0 -z-10 bg-dark" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="grid grid-cols-1 items-end gap-8 px-[4.3%] md:mt-auto lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
        {/* COLUMNA IZQUIERDA: título, subtítulo y pill */}
        <div>
          <h1 className="text-[clamp(44px,8vw,108px)] font-semibold leading-[0.92] drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
            {heroData.title.map((line) => (
              <span key={line} className="block whitespace-nowrap">{line}</span>
            ))}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-snug md:text-3xl">{heroData.subtitle}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2 text-sm font-semibold md:mt-6 md:gap-3 md:px-6 md:py-3 md:text-xl">
            <span className="h-2.5 w-2.5 animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-green md:h-3 md:w-3" />
            {heroData.liveLabel}
          </div>
        </div>

        {/* COLUMNA CENTRAL: burbujas de precio */}
        <div className="flex items-end justify-center pb-2 md:pb-6">
          {heroData.badges.map((badge, index) => (
            <div key={badge.label} className={index > 0 ? '-ml-3 md:-ml-6' : ''}>
              <PriceBadge label={badge.label} price={badge.price} />
            </div>
          ))}
        </div>

        {/* COLUMNA DERECHA: formulario */}
        <div className="flex justify-center lg:self-center">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}

export default Hero;