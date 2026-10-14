import logo from '../../assets/logos/logo-mejor-internet.png';
import TopTicker from './TopTicker';

// ENCABEZADO responsive y proporcional.
// CELULAR: va en el flujo normal (relative), así el hero empieza debajo. Sin cambios.
// TABLET/PC (md+): se queda encima del hero (absolute) y todo crece con el ancho.
// GUÍA: altura de la barra en tablet/PC md:h-[clamp(56px,4.2vw,96px)] (más = barra más alta)
// LOGO tablet/PC: md:h-[clamp(40px,3.3vw,72px)] md:w-[clamp(90px,7.5vw,160px)]
// FONDO: bg-white/70 (más bajo = más transparente) · difuminado: backdrop-blur-md

function Header() {
  return (
    <header className="relative z-20 w-full text-white md:absolute md:inset-x-0 md:top-0">
      {/* BARRA TRANSLÚCIDA CON DIFUMINADO. Solo tiene línea blanca abajo. */}
      <div className="border-b border-b-white/30 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-[56px] items-center px-4 md:h-[clamp(56px,4.2vw,96px)] md:max-w-none md:px-[4.3%]">
          <img
            src={logo}
            alt="Mejor Internet"
            className="h-8 w-20 object-contain md:h-[clamp(40px,3.3vw,72px)] md:w-[clamp(90px,7.5vw,160px)]"
          />
        </div>
      </div>
      <TopTicker />
    </header>
  );
}

export default Header;