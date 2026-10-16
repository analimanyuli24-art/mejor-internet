import logo from '../../assets/logos/logo-mejor-internet.png';
import TopTicker from './TopTicker';

function Header() {
  return (
   <header className="absolute inset-x-0 top-0 z-20 w-full text-white">
      {/* BARRA TRANSLÚCIDA CON DIFUMINADO. Solo tiene línea blanca abajo. */}
      <div className="max-md:rounded-t-[2px] border-b border-b-white/30 bg-white/75 backdrop-blur-md md:bg-white/70">
        <div className="mx-auto flex h-[34px] items-center px-4 md:h-[clamp(56px,4.2vw,96px)] md:max-w-none md:px-[4.3%]">
          <img
            src={logo}
            alt="Mejor Internet"
            className="h-5 w-[56px] object-contain md:h-[clamp(40px,3.3vw,72px)] md:w-[clamp(90px,7.5vw,160px)]"
          />
        </div>
      </div>
      <TopTicker />
    </header>
  );
}

export default Header;