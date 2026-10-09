import { introData } from '../../data/siteData';

// TEXTO INTRODUCTORIO responsive: el tamaño del título se ajusta solo según el ancho de la pantalla.
// GUÍA: tamaño del título text-[clamp(26px,3.6vw,56px)]
//       (más grande = sube el 56, más chico = baja el 26)

function Intro() {
  return (
    <section className="mx-[2%] px-4 pt-10 text-center md:pt-14">
      <h2 className="mx-auto max-w-5xl text-[clamp(26px,3.6vw,56px)] font-semibold leading-tight">
        {introData.title}
      </h2>
      <p className="mx-auto mt-6 max-w-3xl text-base md:text-2xl">{introData.text}</p>
    </section>
  );
}

export default Intro;