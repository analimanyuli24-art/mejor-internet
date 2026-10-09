import { tickerMessages } from '../../data/siteData';

// BARRA MORADA de oferta: mensajes en bucle continuo (3 copias).
// GUÍA: velocidad 30s (más = más lento). Letra: text-sm en celular, text-lg en PC.

const COPIES = [0, 1, 2];

function TopTicker() {
  return (
    <div className="overflow-hidden bg-purple py-2 text-sm font-medium text-white md:py-3 md:text-lg">
      <div className="flex w-max animate-[ticker-scroll_30s_linear_infinite]">
        {COPIES.map((copy) => (
          <div key={copy} className="flex shrink-0 gap-10 pr-10 md:gap-16 md:pr-16">
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