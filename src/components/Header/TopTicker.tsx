import { tickerMessages } from '../../data/siteData';

// BARRA MORADA de oferta: mensajes en bucle continuo (3 copias).
// GUÍA: velocidad 30s (más = más lento).
// Letra: text-sm en celular · tablet/PC md:text-[clamp(12px,1vw,22px)] (más = letra más grande)
// Espacio entre mensajes en tablet/PC: clamp(32px,3.2vw,64px)

const COPIES = [0, 1, 2];

function TopTicker() {
  return (
    <div className="overflow-hidden bg-purple py-2 text-sm font-medium text-white md:py-[clamp(6px,0.6vw,14px)] md:text-[clamp(12px,1vw,22px)]">
      <div className="flex w-max animate-[ticker-scroll_30s_linear_infinite]">
        {COPIES.map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-10 pr-10 md:gap-[clamp(32px,3.2vw,64px)] md:pr-[clamp(32px,3.2vw,64px)]"
          >
            {tickerMessages.map((message, index) => (
              <span key={index} className="whitespace-nowrap">{message}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTicker;