import { useState } from 'react';
import { footerData } from '../../data/siteData';
import logo from '../../assets/logos/logo-mejor-internet.png';
import { sendLead, isValidPhone } from '../../services/leadService';

function Footer() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = async () => {
    if (!isValidPhone(phone)) return setMessage('Ingresa un número de 9 dígitos.');
    const result = await sendLead({ phone, acceptedPrivacy: true, source: 'footer' });
<img src={logo} alt="Mejor Internet" className="h-10 w-28 object-contain md:h-16 md:w-36" />
  };

  return (
    <footer className="relative z-10 -mt-12 rounded-t-[40px] bg-dark px-6 pb-10 pt-10 text-white md:-mt-24 md:px-[4.3%] md:pt-16">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <img src={logo} alt="Mejor Internet" className="h-10 w-28 object-contain md:h-16 md:w-36" />

        <div className="w-full text-center md:w-[600px] md:text-right">
          <p className="text-xl font-bold md:text-2xl">Te informamos</p>
          <p className="text-base md:whitespace-nowrap md:text-xl">Deja tu teléfono y te llamamos sin compromiso</p>

          <div className="mx-auto mt-5 w-full max-w-[290px] md:ml-auto md:mr-16 md:w-[290px]">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tu número de teléfono"
              className="h-12 w-full rounded-full border border-white/50 bg-transparent px-5 text-center text-base placeholder:text-white/60"
            />
            <button
              type="button"
              onClick={handleCall}
              className="mt-6 mx-auto block rounded-full bg-white px-10 py-3 text-base font-bold uppercase text-purple shadow-md transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-purple hover:text-white hover:shadow-[0_12px_24px_rgba(138,56,245,0.5)] active:scale-95"
            >
              Llamanos
            </button>
            {message && <p className="mt-2 text-xs">{message}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/30 pt-6 text-sm md:text-lg">
        <p>{footerData.companyName}</p>
        <p className="mt-2 flex flex-wrap gap-x-2">
          {footerData.legalLinks.map((link, index) => (
            <span key={link.label}>
              {/* TODO: AGREGAR ENLACE CUANDO SE DEFINA EL DESTINO (ver siteData.ts) */}
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