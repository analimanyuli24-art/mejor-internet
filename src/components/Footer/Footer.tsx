import { useState } from 'react';
import { footerData } from '../../data/siteData';
import footerLogo from '../../assets/logos/logo-mejor-internet-white.png';
import { sendLead, isValidPhone } from '../../services/leadService';

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
    <footer className="relative z-10 -mt-12 rounded-t-[32px] bg-dark px-5 pb-4 pt-6 text-white md:-mt-24 md:px-[4.3%] md:pb-6 md:pt-12">
      <div className="flex flex-row items-start justify-between gap-4 md:flex-row md:items-stretch md:gap-6">
        <img
          src={footerLogo}
          alt="Mejor Internet"
          className="relative -left-2 -top-2 h-[40px] w-[100px] object-contain md:-left-8 md:-top-6 md:h-[clamp(72px,7.2vw,120px)] md:w-[clamp(190px,18vw,270px)]"
        />

        <div className="w-[58%] text-right md:w-[clamp(300px,36vw,480px)] md:text-right">
          <p className="text-[11px] font-bold md:text-[clamp(14px,1.4vw,20px)]">Te informamos</p>
          <p className="text-[9px] leading-snug md:text-[clamp(12px,1.1vw,16px)]">
            Deja tu teléfono y te llamamos sin compromiso
          </p>

          <div className="ml-auto mt-2 w-full max-w-[160px] md:mt-4 md:max-w-[clamp(200px,20vw,260px)]">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tu número de teléfono"
              className="h-7 w-full rounded-full border border-white/50 bg-transparent px-3 text-center text-[8px] placeholder:text-white/60 md:h-[clamp(36px,3vw,44px)] md:px-4 md:text-[clamp(11px,1vw,14px)]"
            />
            <button
              type="button"
              onClick={handleCall}
              className="mx-auto mt-2 block rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase text-purple shadow-md transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-purple hover:text-white hover:shadow-[0_12px_24px_rgba(138,56,245,0.5)] active:scale-95 md:mt-4 md:px-[clamp(20px,2.5vw,32px)] md:py-[clamp(6px,0.6vw,10px)] md:text-[clamp(11px,1vw,14px)]"
            >
              Solicitar llamada
            </button>
            {message && <p className="mt-2 text-[8px] md:text-[clamp(10px,0.9vw,12px)]">{message}</p>}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/30 pt-3 text-[8px] leading-relaxed max-md:text-center md:mt-6 md:pt-4 md:text-[clamp(11px,1vw,14px)]">
        <div className="max-md:flex max-md:items-center max-md:justify-center max-md:gap-2 max-md:whitespace-nowrap">
          <p className="inline md:block">{footerData.companyName}</p>
          <span className="inline md:hidden">
            {footerData.legalLinks.map((link, index) => (
              <span key={link.label}>
                <a href={link.href} className="hover:underline">{link.label}</a>
                {index < footerData.legalLinks.length - 1 && ' / '}
              </span>
            ))}
          </span>
        </div>
        <p className="mt-1 hidden flex-wrap gap-x-2 md:flex">
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