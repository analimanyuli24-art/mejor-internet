import type { PlanCardData } from "../../types/content.types";
import { useCallRequest } from "../CallRequest/CallRequestContext";
import { getIconSrc, getLogoSrc } from "../../utils/getIconSrc";
import Button from "../ui/Button";

// CUADRO de cada canal (tablet y PC: vw con tope en px, así se achica con el zoom).
const channelSizes: Record<string, string> = {
  "logo-disney":
    "h-14 w-14 md:h-[min(5vw,72px)] md:w-[min(5vw,72px)] lg:h-[min(3vw,43px)] lg:w-[min(3vw,43px)]",
  "logo-espa":
    "h-14 w-14 md:h-[min(5vw,72px)] md:w-[min(5vw,72px)] lg:h-[min(3vw,43px)] lg:w-[min(3vw,43px)]",
  "logo-sony":
    "h-14 w-14 md:h-[min(5vw,72px)] md:w-[min(5vw,72px)] lg:h-[min(3vw,43px)] lg:w-[min(3vw,43px)]",
  "logo-warner":
    "h-14 w-14 md:h-[min(5vw,72px)] md:w-[min(5vw,72px)] lg:h-[min(3vw,43px)] lg:w-[min(3vw,43px)]",
};

// ZOOM de la imagen dentro de su cuadro: scale-90 la aleja, scale-110 la acerca.
const channelZoom: Record<string, string> = {
  "logo-disney": "scale-100",
  "logo-espa": "scale-100",
  "logo-sony": "scale-100",
  "logo-warner": "scale-100",
};

// ÍCONO SOLO (TV, 5G, etc.) según el ancho de pantalla.
const iconLg =
  "lg:h-[min(5vw,64px)] xl:h-[min(4.5vw,72px)] 2xl:h-[min(4vw,80px)] min-[1920px]:h-[min(4vw,96px)]";

// Cambia la clave por el iconKey exacto de siteData.ts si un plan necesita otro tamaño.
const iconSizes: Record<string, string> = {
  "icono-5g": iconLg,
  // 'otro-icono': 'lg:h-[min(4vw,58px)] xl:h-[min(3.8vw,64px)]',
};

// TÍTULO DEL BADGE: mismo tamaño para todas las tarjetas en PC y laptop.
const badgeLg =
  "lg:text-[min(1.7vw,24px)] xl:text-[min(1.6vw,26px)] 2xl:text-[min(1.5vw,28px)] min-[1920px]:text-[min(1.4vw,30px)]";

// SOLO el logo LIGA de la tarjeta de MÁXIMA VELOCIDAD: baja un poco en PC.
const ligaOffset = (badge: string, src: string) =>
  badge === "¡MÁXIMA VELOCIDAD!" && src.includes("logo-liga")
    ? "lg:mt-[min(1.2vw,16px)] xl:mt-[min(1.1vw,18px)]"
    : "";

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
  if (!plan) return null;
  const gbLineIndex = plan.description.findIndex((line) => line.includes("GB"));
  const strikeIndex = gbLineIndex === -1 ? 0 : gbLineIndex;
  const iconSrc = getIconSrc(plan.iconKey);
  const logoSrcs = toSrcs(plan.logos);
  const channelSrcs = toSrcs(plan.channels);
  const deviceSrcs = toSrcs(plan.devices);
  const hasImages =
    logoSrcs.length > 0 || channelSrcs.length > 0 || deviceSrcs.length > 0;
  const small = Boolean(plan.compact);
  // Tarjetas con canales: letras e íconos un poco más chicos en PC.
  const dense = (plan.channels?.length ?? 0) > 0;

  // Texto de descripción y viñetas según el ancho de pantalla.
  const textClass = dense
    ? "lg:text-[min(1.5vw,19px)] xl:text-[min(1.4vw,20px)] 2xl:text-[min(1.3vw,21px)] min-[1920px]:text-[min(1.2vw,22px)]"
    : "lg:text-[min(1.6vw,20px)] xl:text-[min(1.5vw,21px)] 2xl:text-[min(1.4vw,22px)] min-[1920px]:text-[min(1.3vw,24px)]";

  return (
    <article className="flex min-h-[260px] w-full flex-col items-center rounded-[16px] bg-dark px-3 pb-4 pt-4 text-center text-white shadow-[0_10px_22px_rgba(0,0,0,0.35)] transition duration-300 hover:shadow-[0_18px_34px_rgba(0,0,0,0.45)] md:min-h-[min(40vw,576px)] lg:min-h-[min(34vw,480px)] xl:min-h-[min(34vw,480px)] md:rounded-[min(4vw,58px)] lg:rounded-[60px] xl:rounded-[60px] md:px-[6%] md:pt-[min(4vw,20px)] md:pb-[4%] md:pb-6 lg:pt-[min(2.4vw,34px)] lg:pb-[min(1vw,14px)] xl:py-[min(1.5vw,22px)] xl:pb-[min(1vw,14px)]">
      {/* BADGE: celular text-[12px] · tablet y PC con tope en px · PC en una línea */}
      <span
        className={`inline-flex w-[90%] items-center justify-center rounded-full bg-purple px-2 py-1 text-center text-[12px] font-bold leading-tight md:w-[94%] md:whitespace-nowrap md:px-[min(0.8vw,12px)] md:py-[min(0.6vw,9px)] md:text-[min(1.2vw,17px)] md:leading-none lg:w-[78%] lg:whitespace-nowrap lg:px-[min(2.2vw,32px)] lg:py-[min(1vw,14px)] lg:leading-none ${badgeLg}`}
      >
        {plan.badge}
      </span>

      {/* DESCRIPCIÓN: celular text-[10px] · tablet y PC según el ancho */}
      <div
        className={`mt-2 space-y-0.5 text-[10px] leading-snug md:mt-[6%] md:text-[clamp(10px,1vw,14px)] ${textClass}`}
      >
        {plan.description.map((line, index) => (
          <p key={line}>
            {index === strikeIndex && plan.oldGb && (
              <s className="mr-1 decoration-1 md:decoration-2">{plan.oldGb}</s>
            )}
            {line}
          </p>
        ))}
      </div>

      {/* BULLETS: celular text-[10px] · tablet y PC según el ancho */}
      <div
        className={`mt-1 space-y-0.5 text-[10px] md:mt-2 md:text-[clamp(10px,1vw,14px)] ${textClass}`}
      >
        {plan.bullets?.map((bullet) => (
          <p key={bullet}>• {bullet}</p>
        ))}
      </div>

      {/* IMAGEN: logos, canales y router, o ícono del plan */}
      {hasImages ? (
        <div
          className={`my-2 flex flex-col items-center md:my-auto md:py-[min(1.5vw,22px)] ${dense ? "lg:h-auto lg:pt-[min(3.4vw,52px)] lg:pb-[min(1.6vw,24px)]" : "lg:h-[min(9vw,130px)] lg:justify-center lg:py-0"} ${small ? "gap-1" : "gap-2 lg:gap-[min(0.8vw,12px)]"}`}
        >
          {logoSrcs.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`w-auto object-contain ${small ? "max-h-[22px] md:max-h-[min(6.2vw,110px)] lg:max-h-[min(4vw,58px)] xl:max-h-[min(3.8vw,64px)] 2xl:max-h-[min(3.5vw,70px)] min-[1920px]:max-h-[min(3.3vw,76px)]" : "max-h-[30px] md:max-h-[min(6.5vw,94px)] lg:max-h-[min(5vw,72px)]"} ${ligaOffset(plan.badge, src)}`}
            />
          ))}
          {(channelSrcs.length > 0 || deviceSrcs.length > 0) && (
            <div className="flex items-center justify-center gap-2 md:gap-[min(1.2vw,17px)]">
              {channelSrcs.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 md:gap-[min(0.6vw,9px)] lg:gap-[min(0.5vw,8px)] xl:gap-[min(0.5vw,9px)] 2xl:gap-[min(0.5vw,10px)]">
                  {(plan.channels ?? []).map((name) => {
                    const src = getLogoSrc(name);
                    return src ? (
                      <div
                        key={name}
                        className={`overflow-hidden rounded-xl shadow-md ${small ? "h-7 w-7 md:h-[min(4vw,26px)] md:w-[min(4vw,26px)] lg:h-[min(6.2vw,44px)] lg:w-[min(6.2vw,44px)] xl:h-[min(5.8vw,48px)] xl:w-[min(5.8vw,48px)] 2xl:h-[min(5.4vw,54px)] 2xl:w-[min(5.4vw,54px)] min-[1920px]:h-[min(5vw,58px)] min-[1920px]:w-[min(5vw,58px)]" : dense ? "h-10 w-10 md:h-[min(3.5vw,26px)] md:w-[min(3.5vw,26px)] lg:h-[min(1.8vw,24px)] lg:w-[min(1.8vw,24px)]" : (channelSizes[name] ?? "h-10 w-10 md:h-[min(5vw,72px)] md:w-[min(5vw,72px)] lg:h-[min(2.8vw,40px)] lg:w-[min(2.8vw,40px)]")}`}
                      >
                        <img
                          src={src}
                          alt=""
                          aria-hidden="true"
                          className={`h-full w-full object-cover ${channelZoom[name] ?? "scale-100"}`}
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
                  className={`w-auto object-contain ${small ? "max-h-[36px] md:max-h-[min(7vw,101px)] lg:max-h-[min(6.5vw,94px)]" : dense ? "max-h-[40px] md:max-h-[min(6vw,86px)] lg:max-h-[min(3.8vw,58px)] xl:max-h-[min(3.6vw,62px)] 2xl:max-h-[min(3vw,64px)] min-[1920px]:max-h-[min(3vw,70px)]" : "max-h-[40px] md:max-h-[min(6vw,86px)] lg:max-h-[min(3.9vw,56px)] xl:max-h-[min(3.6vw,62px)] 2xl:max-h-[min(3.4vw,70px)] min-[1920px]:max-h-[min(3.4vw,78px)]"}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        iconSrc && (
          <div className="flex w-full justify-center md:flex-1 md:items-center md:py-[min(2.5vw,36px)] lg:h-[min(9vw,130px)] xl:h-[min(8.5vw,145px)] 2xl:h-[min(8vw,160px)] min-[1920px]:h-[min(8vw,175px)] lg:items-center lg:py-0">
            <img
              src={iconSrc}
              alt=""
              aria-hidden="true"
              className={`mt-4 mb-2 h-[56px] w-auto max-w-full object-contain md:my-0 md:h-[min(6vw,86px)] ${iconSizes[plan.iconKey] ?? iconLg}`}
            />
          </div>
        )
      )}

      {/* PRECIO + BOTÓN: van juntos al fondo, así quedan alineados en todas las tarjetas */}
      <div className="mt-auto flex w-full flex-col items-center">
        <p className="pt-2 text-xl font-bold md:text-[clamp(20px,2.6vw,37px)] lg:text-[min(3vw,40px)] xl:text-[min(2.8vw,44px)] 2xl:text-[min(2.6vw,48px)] min-[1920px]:text-[min(2.4vw,52px)]">
          {plan.price}
          <span className="text-[9px] font-normal md:text-[clamp(9px,0.8vw,12px)] lg:text-[min(1vw,12px)] xl:text-[min(0.9vw,13px)] 2xl:text-[min(0.8vw,14px)] min-[1920px]:text-[min(0.8vw,14px)]">
            /mes
          </span>
        </p>

        {/* BOTÓN CELULAR: chico */}
        <button
          type="button"
          onClick={() => openCallRequest(plan.id)}
          className="mt-2 mb-1 rounded-full bg-purple px-4 py-1.5 text-[10px] font-semibold text-white md:hidden"
        >
          Saber más
        </button>

        {/* BOTÓN TABLET Y PC: grande (Button), con tope en px */}
        <div className="mt-3 mb-4 hidden md:mt-[4%] md:block lg:mt-[min(1.5vw,22px)]">
          <Button
            size="xl"
            className="md:px-[clamp(16px,2.4vw,35px)] md:py-[clamp(5px,0.6vw,9px)] md:text-[clamp(13px,1.5vw,22px)] lg:px-[min(2.8vw,42px)] lg:py-[min(0.8vw,12px)] lg:text-[min(1.8vw,26px)] xl:px-[min(2.8vw,42px)] xl:py-[min(0.8vw,12px)] xl:text-[min(1.8vw,26px)]"
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
