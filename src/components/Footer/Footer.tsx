import { useState } from 'react';
import { footerData } from '../../data/siteData';
import { sendLead, isValidPhone } from '../../services/leadService';
import ImagePlaceholder from '../ui/ImagePlaceholder';

// PIE DE PÁGINA responsive.
// Celular: todo apilado y centrado. PC (md+): logo a la izquierda y formulario a la derecha.
// GUÍA: ancho del bloque derecho md:w-[600px] · ancho del input md:w-[290px]

function Footer() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = async () => {
    if (!isValidPhone(phone)) return setMessage('Ingresa un número de 9 dígitos.');
    const result = await sendLead({ phone, acceptedPrivacy: true, source: 'footer' });
    setMessage(result.ok ? 'Gracias, te llamaremos.' : result.message ?? 'Error al enviar.');
  };

  return (
    <footer className="relative z-10 -mt-12 rounded-t-[40px] bg-dark px-6 pb-10 pt-10 text-white md:-mt-24 md:px-[4.3%] md:pt-16">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        {/* TODO: REEMPLAZAR POR LOGO ORIGINAL -> src/assets/logos/logo-mejor-internet-white.png */}
        <ImagePlaceholder name="logo-footer" className="h-16 w-40 md:h-20 md:w-48" />

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
              className="mx-auto mt-4 block rounded-full bg-white px-6 py-1.5 text-sm font-semibold text-purple"
            >
              LLAMANOS
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