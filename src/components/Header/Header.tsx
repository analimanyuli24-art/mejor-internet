import logo from '../../assets/logos/logo-mejor-internet.png';
import TopTicker from './TopTicker';

// ENCABEZADO responsive.
// GUÍA: altura de la barra en celular h-[72px] · PC md:h-[80px] (más = barra más alta)
// Logo: h-10 w-28 en celular, md:h-16 md:w-36 en PC.

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
      {/* BARRA BLANCA TRANSLÚCIDA pegada al borde superior. Solo tiene línea blanca abajo. */}
      <div className="border-b border-b-white/30 bg-white/70">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center px-[4.3%] md:h-[80px]">
          <img src={logo} alt="Mejor Internet" className="h-10 w-28 object-contain md:h-16 md:w-36" />
        </div>
      </div>
      <TopTicker />
    </header>
  );
}

export default Header;