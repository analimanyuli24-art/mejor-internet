import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Intro from '../components/Intro/Intro';
import PlanSection from '../components/PlanSection/PlanSection';
import Advantages from '../components/Advantages/Advantages';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';

// PÁGINA PRINCIPAL: solo une las secciones en orden.
// Para cambiar una sección, entra a su carpeta en src/components/.
//
// Header -> Hero -> Intro -> PlanSection -> Advantages -> FAQ -> Footer

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Intro />
      <PlanSection />
      <Advantages />
      <FAQ />
      <Footer />
    </main>
  );
}

export default HomePage;
