import type { PlanCardData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';
import { getIconSrc, getLogoSrc } from '../../utils/getIconSrc';
import Button from '../ui/Button';

// CUADRO de cada canal (en tablet y PC se escala con la pantalla; celular igual).
const channelSizes: Record<string, string> = {
  'logo-disney': 'h-14 w-14 md:h-[5vw] md:w-[5vw] lg:h-[4.8vw] lg:w-[4.8vw]',
  'logo-espa': 'h-14 w-14 md:h-[5vw] md:w-[5vw] lg:h-[4.8vw] lg:w-[4.8vw]',
  'logo-sony': 'h-14 w-14 md:h-[5vw] md:w-[5vw] lg:h-[4.8vw] lg:w-[4.8vw]',
  'logo-warner': 'h-14 w-14 md:h-[5vw] md:w-[5vw] lg:h-[4.8vw] lg:w-[4.8vw]',
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
// TABLET Y PC (768 px o más): todo proporcional al ancho de la pantalla, sin tamaños fijos.
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
    <article className="flex min-h-[260px] w-full flex-col items-center rounded-[16px] bg-dark px-3 pb-4 pt-4 text-center text-white shadow-[0_10px_22px_rgba(0,0,0,0.35)] transition duration-300 hover:shadow-[0_18px_34px_rgba(0,0,0,0.45)] md:min-h-0 lg:min-h-[440px] xl:min-h-[430px] md:rounded-[32px] md:px-[6%] md:py-[4%] md:pb-6">
      {/* BADGE: celular text-[10px] · tablet y PC grandes en una línea */}
      <span className="inline-flex w-[90%] items-center justify-center rounded-full bg-purple px-2 py-1 text-center text-[10px] font-bold leading-tight md:w-[94%] md:whitespace-nowrap md:px-[1vw] md:py-[0.5vw] md:text-[max(12px,1.6vw)] lg:w-[94%] lg:px-[1vw] lg:py-[0.6vw] lg:text-[max(14px,1.8vw)]">
        {plan.badge}
      </span>

      {/* DESCRIPCIÓN: celular text-[10px] · tablet y PC proporcionales */}
      <div className="mt-2 space-y-0.5 text-[10px] leading-snug md:mt-[6%] md:text-[max(10px,1vw)] lg:text-[max(12px,1.3vw)]">
        {plan.description.map((line, index) => (
          <p key={line}>
            {index === strikeIndex && plan.oldGb && (
              <s className="mr-1 decoration-2">{plan.oldGb}</s>
            )}
            {line}
          </p>
        ))}
      </div>

      {/* BULLETS: celular text-[10px] · tablet y PC proporcionales */}
      <div className="mt-1 space-y-0.5 text-[10px] md:mt-2 md:text-[max(10px,1vw)] lg:text-[max(12px,1.3vw)]">
        {plan.bullets?.map((bullet) => (
          <p key={bullet}>• {bullet}</p>
        ))}
      </div>

      {/* IMAGEN: logos, canales y router, o ícono del plan */}
      {hasImages ? (
          <div className={`my-2 flex flex-col items-center md:my-auto md:py-[1.5vw] lg:py-[1.8vw] ${small ? 'gap-1' : 'gap-2'}`}>
          {logoSrcs.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`w-auto object-contain ${small ? 'max-h-[22px] md:max-h-[4.6vw] lg:max-h-[4.2vw]' : 'max-h-[30px] md:max-h-[6.5vw] lg:max-h-[6.5vw]'}`}
            />
          ))}
          {(channelSrcs.length > 0 || deviceSrcs.length > 0) && (
            <div className="flex items-center justify-center gap-2 md:gap-[1.2vw]">
              {channelSrcs.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 md:gap-[0.6vw]">
                  {(plan.channels ?? []).map((name) => {
                    const src = getLogoSrc(name);
                    return src ? (
                      <div
                        key={name}
                        className={`overflow-hidden rounded-xl shadow-md ${small ? 'h-7 w-7 md:h-[4vw] md:w-[4vw] lg:h-[4.5vw] lg:w-[4.5vw]' : channelSizes[name] ?? 'h-10 w-10 md:h-[5vw] md:w-[5vw] lg:h-[4.8vw] lg:w-[4.8vw]'}`}
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
                  className={`w-auto object-contain ${small ? 'max-h-[36px] md:max-h-[7vw] lg:max-h-[6.5vw]' : 'max-h-[40px] md:max-h-[8vw] lg:max-h-[8vw]'}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        iconSrc && (
          <div className="flex w-full justify-center md:flex-1 md:items-center md:py-[2.5vw] lg:py-[3vw]">
            <img
              src={iconSrc}
              alt=""
              aria-hidden="true"
              className="mt-4 mb-2 h-[56px] w-auto max-w-full object-contain md:my-0 md:h-[10vw] lg:h-[11vw]"
            />
          </div>
        )
      )}

      {/* PRECIO + BOTÓN: van juntos al fondo, así quedan alineados en todas las tarjetas */}
      <div className="mt-auto flex w-full flex-col items-center">
        <p className="pt-2 text-xl font-bold md:text-[max(20px,2.6vw)] lg:text-[max(24px,3vw)]">
          {plan.price}
          <span className="text-[9px] font-normal md:text-[max(9px,0.8vw)] lg:text-[max(11px,1vw)]">/mes</span>
        </p>

        {/* BOTÓN CELULAR: chico */}
        <button
          type="button"
          onClick={() => openCallRequest(plan.id)}
          className="mt-2 mb-1 rounded-full bg-purple px-4 py-1.5 text-[10px] font-semibold text-white md:hidden"
        >
          Saber más
        </button>

        {/* BOTÓN TABLET Y PC: grande (Button), proporcional al ancho */}
        <div className="mt-3 mb-4 hidden md:mt-[4%] md:block">
          <Button
            size="xl"
            className="md:px-[max(16px,2.4vw)] md:py-[max(5px,0.6vw)] md:text-[max(13px,1.5vw)] lg:px-[max(16px,2.4vw)] lg:py-[max(5px,0.6vw)] lg:text-[max(13px,1.5vw)]"
            onClick={() => openCallRequest(plan.id)}
          >
            Saber más
          </Button>
        </div>
      </div>
    </article>
  );
}

export default PlanCard;