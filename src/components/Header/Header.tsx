import ImagePlaceholder from '../ui/ImagePlaceholder';
import TopTicker from './TopTicker';

// ENCABEZADO responsive.
// GUÍA: altura de la barra en celular h-[72px] (PC h-[110px]).
// Logo: h-10 w-28 en celular, h-16 w-36 en PC.

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
      {/* LÍNEA NEGRA arriba y LÍNEA BLANCA abajo de la barra blanca translúcida */}
      <div className="border-t-4 border-t-black border-b border-b-white/30 bg-white/70">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center px-[4.3%] md:h-[110px]">
          {/* TODO: REEMPLAZAR POR LOGO ORIGINAL -> src/assets/logos/logo-mejor-internet.png */}
          <ImagePlaceholder name="logo-mejor-internet" className="h-10 w-28 md:h-16 md:w-36" />
        </div>
      </div>
      <TopTicker />
    </header>
  );
}

export default Header;