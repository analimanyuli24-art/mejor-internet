import type { PlanCardData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';
import { getIconSrc, getLogoSrc } from '../../utils/getIconSrc';
import Button from '../ui/Button';

// CUADRO de cada canal (tamaño fijo).
const channelSizes: Record<string, string> = {
  'logo-disney': 'h-14 w-14 md:h-16 md:w-16',
  'logo-espa': 'h-14 w-14 md:h-16 md:w-16',
  'logo-sony': 'h-14 w-14 md:h-16 md:w-16',
  'logo-warner': 'h-14 w-14 md:h-16 md:w-16',
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

// CELULAR: tarjeta más baja, textos y botón chicos (tamaños en px).
// PC (md+): mismos valores de siempre, con el botón grande (Button).
// GB TACHADO: va en la línea del GB; si ninguna línea tiene GB, va en la primera.

function PlanCard({ plan }: PlanCardProps) {
  const { openCallRequest } = useCallRequest();
  const gbLineIndex = plan.description.findIndex((line) => line.includes('GB'));
  const strikeIndex = gbLineIndex === -1 ? 0 : gbLineIndex;
  const iconSrc = getIconSrc(plan.iconKey);
  const logoSrcs = toSrcs(plan.logos);
  const channelSrcs = toSrcs(plan.channels);
  const deviceSrcs = toSrcs(plan.devices);
  const hasImages = logoSrcs.length > 0 || channelSrcs.length > 0 || deviceSrcs.length > 0;
  const small = Boolean(plan.compact);

  return (
    <article className="flex min-h-[260px] w-full flex-col items-center rounded-[16px] bg-dark px-3 pb-4 pt-4 text-center text-white shadow-[0_10px_22px_rgba(0,0,0,0.35)] transition duration-300 hover:shadow-[0_18px_34px_rgba(0,0,0,0.45)] md:min-h-[440px] xl:min-h-[430px] md:rounded-[32px] md:px-[6%] md:py-[4%] md:pb-6">
      {/* BADGE: celular text-[10px] · PC text-lg */}
      <span className="inline-flex w-[90%] items-center justify-center rounded-full bg-purple px-2 py-1 text-center text-[10px] font-bold leading-tight md:w-[85%] md:px-3 md:text-lg 2xl:text-xl">
        {plan.badge}
      </span>

      {/* DESCRIPCIÓN: celular text-[10px] · PC text-base */}
      <div className="mt-2 space-y-0.5 text-[10px] leading-snug md:mt-[6%] md:text-base 2xl:text-lg">
        {plan.description.map((line, index) => (
          <p key={line}>
            {index === strikeIndex && plan.oldGb && (
              <s className="mr-1 decoration-2">{plan.oldGb}</s>
            )}
            {line}
          </p>
        ))}
      </div>

      {/* BULLETS: celular text-[10px] · PC text-base */}
      <div className="mt-1 space-y-0.5 text-[10px] md:mt-2 md:text-base">
        {plan.bullets?.map((bullet) => (
          <p key={bullet}>• {bullet}</p>
        ))}
      </div>

      {/* IMAGEN: logos, canales y router, o ícono del plan */}
      {hasImages ? (
        <div className={`my-2 flex flex-col items-center md:my-auto ${small ? 'gap-1' : 'gap-2'}`}>
          {logoSrcs.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`w-auto object-contain ${small ? 'max-h-[22px] md:max-h-[40px]' : 'max-h-[30px] md:max-h-[60px]'}`}
            />
          ))}
          {(channelSrcs.length > 0 || deviceSrcs.length > 0) && (
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {channelSrcs.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                  {(plan.channels ?? []).map((name) => {
                    const src = getLogoSrc(name);
                    return src ? (
                      <div
                        key={name}
                        className={`overflow-hidden rounded-xl shadow-md ${small ? 'h-7 w-7 md:h-10 md:w-10' : channelSizes[name] ?? 'h-10 w-10 md:h-16 md:w-16'}`}
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
                  className={`w-auto object-contain ${small ? 'max-h-[36px] md:max-h-[60px]' : 'max-h-[40px] md:max-h-[80px]'}`}
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
            className="mx-auto mt-4 mb-2 h-[56px] w-auto max-w-full object-contain md:my-auto md:h-[96px]"
          />
        )
      )}

      {/* PRECIO + BOTÓN: van juntos al fondo, así quedan alineados en todas las tarjetas */}
      <div className="mt-auto flex w-full flex-col items-center">
        <p className="pt-2 text-xl font-bold md:text-4xl">
          {plan.price}
          <span className="text-[9px] font-normal md:text-sm">/mes</span>
        </p>

        {/* BOTÓN CELULAR: chico */}
        <button
          type="button"
          onClick={() => openCallRequest(plan.id)}
          className="mt-2 mb-1 rounded-full bg-purple px-4 py-1.5 text-[10px] font-semibold text-white md:hidden"
        >
          Saber más
        </button>

        {/* BOTÓN PC: grande (Button) */}
        <div className="mt-3 mb-4 hidden md:mt-[4%] md:block">
          <Button size="xl" onClick={() => openCallRequest(plan.id)}>Saber más</Button>
        </div>
      </div>
    </article>
  );
}

export default PlanCard;