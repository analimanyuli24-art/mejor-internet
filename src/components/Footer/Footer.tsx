import { useState } from 'react';
import { footerData } from '../../data/siteData';
import footerLogo from '../../assets/logos/logo-mejor-internet-white.png';
import { sendLead, isValidPhone } from '../../services/leadService';

// GUÍA: los tamaños usan clamp(mínimo, ideal, máximo). Más grande = sube el máximo; más chico = baja el mínimo.
// LOGO: más grande = sube el 120 y el 270 · izquierda = sube el número de -left- · arriba = sube el de -top-

function Footer() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = async () => {
    if (!isValidPhone(phone)) {
      setMessage('Ingresa un número de 9 dígitos.');
      return;
    }
    const result = await sendLead({ phone, acceptedPrivacy: true, source: 'footer' });
    setMessage(result.ok ? 'Gracias, te llamaremos pronto.' : 'No se pudo enviar. Intenta de nuevo.');
    if (result.ok) setPhone('');
  };

  return (
    <footer className="relative z-10 -mt-12 rounded-t-[32px] bg-dark px-6 pb-6 pt-8 text-white md:-mt-24 md:px-[4.3%] md:pt-12">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <img
          src={footerLogo}
          alt="Mejor Internet"
          className="relative -left-4 -top-4 md:-left-8 md:-top-6 h-[clamp(72px,7.2vw,120px)] w-[clamp(190px,18vw,270px)] object-contain"
        />

        <div className="w-full text-center md:w-[clamp(300px,36vw,480px)] md:text-right">
          <p className="text-[clamp(14px,1.4vw,20px)] font-bold">Te informamos</p>
          <p className="text-[clamp(12px,1.1vw,16px)]">Deja tu teléfono y te llamamos sin compromiso</p>

          <div className="mx-auto mt-4 w-full max-w-[clamp(200px,20vw,260px)] md:ml-auto md:mr-[clamp(16px,4vw,64px)]">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tu número de teléfono"
              className="h-[clamp(36px,3vw,44px)] w-full rounded-full border border-white/50 bg-transparent px-4 text-center text-[clamp(11px,1vw,14px)] placeholder:text-white/60"
            />
            <button
              type="button"
              onClick={handleCall}
              className="mt-4 mx-auto block rounded-full bg-white px-[clamp(20px,2.5vw,32px)] py-[clamp(6px,0.6vw,10px)] text-[clamp(11px,1vw,14px)] font-bold uppercase text-purple shadow-md transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-purple hover:text-white hover:shadow-[0_12px_24px_rgba(138,56,245,0.5)] active:scale-95"
            >
              Llamanos
            </button>
            {message && <p className="mt-2 text-[clamp(10px,0.9vw,12px)]">{message}</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/30 pt-4 text-[clamp(11px,1vw,14px)]">
        <p>{footerData.companyName}</p>
        <p className="mt-1 flex flex-wrap gap-x-2">
          {footerData.legalLinks.map((link, index) => (
            <span key={link.label}>
              <a href={link.href} className="hover:underline">{link.label}</a>
              {index < footerData.legalLinks.length - 1 && ' /'}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

export default Footer;