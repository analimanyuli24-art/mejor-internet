import { introData } from '../../data/siteData';

// TEXTO INTRODUCTORIO. En celular el título puede partirse en líneas.
// GUÍA: tamaño del título text-3xl (celular) / md:text-6xl (PC)

function Intro() {
  return (
    <section className="mx-[2%] px-4 pt-10 text-center md:pt-14">
      <h2 className="text-3xl font-semibold md:whitespace-nowrap md:text-6xl">{introData.title}</h2>
      <p className="mx-auto mt-6 max-w-3xl text-base md:text-2xl">{introData.text}</p>
    </section>
  );
}

export default Intro;