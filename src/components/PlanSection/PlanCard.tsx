import type { PlanCardData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';
import { getIconSrc, getLogoSrc } from '../../utils/getIconSrc';
import Button from '../ui/Button';

// TARJETA DE PLAN responsive.
// Celular: textos y precio más chicos · PC (md/xl): tamaños normales.
// IMAGEN: "logos" arriba · "channels" en cuadrícula 2x2 · "devices" al lado de los canales.
// "compact: true" en el plan usa imágenes más chicas solo para ese cuadro.

// CUADRO de cada canal (tamaño fijo).
const channelSizes: Record<string, string> = {
  'logo-disney': 'h-20 w-20 md:h-24 md:w-24',
  'logo-espa': 'h-20 w-20 md:h-24 md:w-24',
  'logo-sony': 'h-20 w-20 md:h-24 md:w-24',
  'logo-warner': 'h-20 w-20 md:h-24 md:w-24',
};

// ZOOM de la imagen dentro de su cuadro: scale-90 la aleja, scale-110 la acerca.
const channelZoom: Record<string, string> = {
  'logo-disney': 'scale-100',
  'logo-espa': 'scale-100',
  'logo-sony': 'scale-100',
  'logo-warner': 'scale-100',
};

function toSrcs(names?: string[]) {
  return (names ?? [])
    .map((name) => getLogoSrc(name))
    .filter((src): src is string => Boolean(src));
}

interface PlanCardProps {
  plan: PlanCardData;
}

function PlanCard({ plan }: PlanCardProps) {
  const { openCallRequest } = useCallRequest();
  const gbLineIndex = plan.description.findIndex((line) => line.includes('GB'));
  const iconSrc = getIconSrc(plan.iconKey);
  const logoSrcs = toSrcs(plan.logos);
  const channelSrcs = toSrcs(plan.channels);
  const deviceSrcs = toSrcs(plan.devices);
  const hasImages = logoSrcs.length > 0 || channelSrcs.length > 0 || deviceSrcs.length > 0;
  const small = Boolean(plan.compact);

  return (
    <article className="flex h-[540px] w-full flex-col items-center rounded-[36px] bg-dark px-5 pb-10 pt-6 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition duration-300 hover:shadow-[0_28px_50px_rgba(0,0,0,0.45)] md:h-[680px] xl:h-[625px] md:rounded-[56px] md:px-[7%] md:py-[6%]">
      {/* BADGE: celular text-base · PC text-2xl */}
      <span className="inline-flex w-[85%] items-center justify-center rounded-full bg-purple px-4 py-1 text-center text-base font-bold leading-tight md:text-2xl 2xl:text-4xl">
        {plan.badge}
      </span>

      {/* DESCRIPCIÓN: celular text-sm · PC text-xl */}
      <div className="mt-4 space-y-1 text-sm leading-snug md:mt-[8%] md:text-xl 2xl:text-2xl">
        {plan.oldGb && gbLineIndex === -1 && (
          <p className="font-semibold line-through decoration-2">{plan.oldGb}</p>
        )}
        {plan.description.map((line, index) => (
          <p key={line}>
            {index === gbLineIndex && plan.oldGb && (
              <s className="mr-1 decoration-2">{plan.oldGb}</s>
            )}
            {line}
          </p>
        ))}
      </div>

      {/* BULLETS: celular text-sm · PC text-xl */}
      <div className="mt-3 space-y-1 text-sm md:text-xl">
        {plan.bullets?.map((bullet) => (
          <p key={bullet}>• {bullet}</p>
        ))}
      </div>

      {/* IMAGEN: logos, canales y router, o ícono del plan */}
      {hasImages ? (
        <div className={`my-4 flex flex-col items-center md:my-auto ${small ? 'gap-1' : 'gap-3'}`}>
          {logoSrcs.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`w-auto object-contain ${small ? 'max-h-[40px] md:max-h-[64px]' : 'max-h-[70px] md:max-h-[110px]'}`}
            />
          ))}
          {(channelSrcs.length > 0 || deviceSrcs.length > 0) && (
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {channelSrcs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {(plan.channels ?? []).map((name) => {
                    const src = getLogoSrc(name);
                    return src ? (
                      <div
                        key={name}
                        className={`overflow-hidden rounded-2xl shadow-md ${small ? 'h-10 w-10 md:h-16 md:w-16' : channelSizes[name] ?? 'h-20 w-20 md:h-24 md:w-24'}`}
                      >
                        <img
                          src={src}
                          alt=""
                          aria-hidden="true"
                          className={`h-full w-full object-cover ${channelZoom[name] ?? 'scale-100'}`}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              {deviceSrcs.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className={`w-auto object-contain ${small ? 'max-h-[64px] md:max-h-[110px]' : 'max-h-[110px] md:max-h-[150px]'}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        iconSrc && (
          <img
            src={iconSrc}
            alt=""
            aria-hidden="true"
            className="mx-auto mt-15 mb-4 h-[150px] w-auto max-w-full object-contain md:my-auto md:h-[170px]"
          />
        )
      )}

      {/* PRECIO: celular text-3xl · PC text-6xl. Siempre alineado abajo. */}
      <p className="mt-auto pt-4 text-3xl font-bold md:text-6xl">
        {plan.price}
        <span className="text-sm font-normal md:text-base">/mes</span>
      </p>

      {/* BOTÓN: mb-6 lo sube para que quede dentro de la tarjeta */}
      <div className="mt-5 mb-6 md:mt-[6%]">
        <Button size="xl" onClick={() => openCallRequest(plan.id)}>Saber más</Button>
      </div>
    </article>
  );
}

export default PlanCard;