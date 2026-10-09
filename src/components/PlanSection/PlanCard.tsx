import type { PlanCardData } from '../../types/content.types';
import { useCallRequest } from '../CallRequest/CallRequestContext';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import Button from '../ui/Button';

// TARJETA DE PLAN responsive.
// Celular: ocupa todo el ancho y los textos son más chicos.
// PC (md+): tarjeta con proporción 25/32, esquinas redondas y sombra.
// GUÍA: esquinas rounded-[36px] (celular) / md:rounded-[56px] (PC) · sombra shadow-[...]
// El GB tachado va en la misma línea del renglón que contiene "GB".

interface PlanCardProps {
  plan: PlanCardData;
}

function PlanCard({ plan }: PlanCardProps) {
  const { openCallRequest } = useCallRequest();
  const gbLineIndex = plan.description.findIndex((line) => line.includes('GB'));

  return (
    <article className="flex w-full flex-col items-center rounded-[36px] bg-dark px-5 py-6 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(0,0,0,0.45)] md:aspect-[25/32] md:rounded-[56px] md:px-[7%] md:py-[6%]">
      {/* BADGE: text-lg en celular, md:text-4xl en PC */}
      <span className="max-w-full whitespace-nowrap rounded-full bg-purple px-4 py-1 text-lg font-bold md:px-7 md:text-4xl">
        {plan.badge}
      </span>

      <div className="mt-4 space-y-1 text-base leading-snug md:mt-[8%] md:text-2xl">
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

      <div className="mt-5 space-y-2 text-base md:text-2xl">
        {plan.bullets?.map((bullet) => (
          <p key={bullet}>• {bullet}</p>
        ))}
      </div>

      {/* TODO: REEMPLAZAR POR ÍCONO/LOGO -> clave: {plan.iconKey} */}
      <ImagePlaceholder name={plan.iconKey} className="my-4 h-16 w-full md:my-auto md:h-32" />

      {/* PRECIO: text-4xl en celular, md:text-6xl en PC */}
      <p className="mt-auto pt-4 text-4xl font-bold md:text-6xl">
        {plan.price}
        <span className="text-sm font-normal md:text-base">/mes</span>
      </p>

      <div className="mt-5 md:mt-[6%]">
        <Button size="xl" onClick={() => openCallRequest(plan.id)}>Saber más</Button>
      </div>
    </article>
  );
}

export default PlanCard;