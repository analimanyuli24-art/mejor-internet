import logo from '../../assets/logos/logo-mejor-internet.png';
import TopTicker from './TopTicker';

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 w-full text-white">
      <div className="max-md:rounded-t-[2px] border-b border-b-white/30 bg-white/75 backdrop-blur-md md:bg-white/70">
        <div className="mx-auto flex h-[34px] items-center justify-between px-4 md:h-[clamp(56px,4.2vw,96px)] md:max-w-none md:px-[4.3%]">
          <img
            src={logo}
            alt="Mejor Internet"
            className="h-5 w-[56px] object-contain md:h-[clamp(40px,3.3vw,72px)] md:w-[clamp(90px,7.5vw,160px)]"
          />

          <a
            href="tel:+5117012045"
            aria-label="Llamar al 01 7012045"
            className="flex items-center gap-2 text-[#1D0B33]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 shrink-0 md:h-[2vw] md:w-[2vw]"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="text-[9px] font-semibold md:text-[1vw]">Llámanos:</span>
              <span className="text-[13px] font-bold md:text-[1.6vw]">01 7012045</span>
            </span>
          </a>
        </div>
      </div>
      <TopTicker />
    </header>
  );
}

export default Header;