import { tickerMessages } from '../../data/siteData';

const COPIES = [0, 1, 2];

function TopTicker() {
  return (
    <div className="overflow-hidden bg-purple py-1 text-[11px] font-medium text-white md:py-[clamp(6px,0.6vw,14px)] md:text-[clamp(12px,1vw,22px)]">
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