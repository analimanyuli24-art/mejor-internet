import { useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { footerData } from '../../data/siteData';
import { legalDocs, type LegalKey } from '../../data/legalData';
import footerLogo from '../../assets/logos/logo-mejor-internet-white.png';
import { sendLead, isValidPhone } from '../../services/leadService';
import LegalModal from './LegalModal';
import { trackFormSubmit } from '../../services/tracking';
import ErrorModal from '../CallRequest/ErrorModal';
import SuccessMessage from '../CallRequest/SuccessMessage';
import LegalLinks from '../legal/LegalLinks';

function Footer() {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);       // 👈 Modal de Éxito ("Solicitud recibida")
  const [failed, setFailed] = useState(false);   // 👈 Modal de Error
  const [loading, setLoading] = useState(false);
  const [legal, setLegal] = useState<LegalKey | null>(null);

  // Validación: Solo se activa con 9 dígitos Y casilla de privacidad marcada
  const canSubmit = isValidPhone(phone) && accepted;

  const handleCall = async () => {
    if (loading || !canSubmit) return;

    setLoading(true);
    try {
      const result = await sendLead({ phone, acceptedPrivacy: accepted, source: 'footer' });
      if (result.ok) {
        trackFormSubmit('footer'); // Evento GTM para Google Ads
        setSent(true);             // 👈 Abre el cuadro grande de "Solicitud recibida"
        setPhone('');
        setAccepted(false);
      } else {
        setFailed(true);           // Abre el cuadro grande de error
      }
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const openLegal = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    setLegal(index === 0 ? 'terms' : 'privacy');
  };

  return (
    <footer className="relative z-10 -mt-12 rounded-t-[32px] bg-dark px-4 pb-6 pt-6 text-white md:-mt-24 md:px-[4.3%] md:pb-6 md:pt-12">
      <div className="flex flex-row items-start justify-between gap-2 md:items-stretch md:gap-6">
        <img
          src={footerLogo}
          alt="Mejor Internet"
          className="relative -left-1 -top-1 h-[36px] w-[85px] shrink-0 object-contain md:-left-8 md:-top-6 md:h-[clamp(72px,7.2vw,120px)] md:w-[clamp(190px,18vw,270px)]"
        />

        <div className="-mr-2 ml-auto w-[68%] text-center md:ml-auto md:-mr-[min(6vw,96px)] md:w-[clamp(300px,36vw,480px)] md:text-center">
          <p className="text-[12px] font-bold md:text-[clamp(14px,1.4vw,20px)]">Te informamos</p>
          <p className="text-[9.5px] leading-snug md:text-[clamp(12px,1.1vw,16px)]">
            Deja tu teléfono y<br />te llamamos sin compromiso
          </p>

          <div className="mx-auto mt-2 w-full max-w-[165px] md:mt-4 md:max-w-[clamp(230px,23vw,290px)]">
            {/* Input de teléfono */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="Tu número de teléfono"
              className="h-7 w-full rounded-full border border-white/50 bg-transparent px-2.5 text-center text-[9px] placeholder:text-[8px] placeholder:text-white/60 md:h-[clamp(36px,3vw,44px)] md:px-4 md:text-[clamp(11px,1vw,14px)] md:placeholder:text-[clamp(10px,0.9vw,13px)]"
            />

            {/* Texto de ayuda */}
            <p className="mt-0.5 text-[7px] text-white/70 md:mt-1.5 md:text-[clamp(10px,0.85vw,12px)]">
              *Ingrese su número sin anteponer el (51)
            </p>

            {/* Checkbox y enlaces legales en 2 líneas ordenadas */}
            <label className="mt-1 flex items-start justify-center gap-1 text-[7px] leading-tight text-white/95 md:mt-2 md:gap-1.5 md:text-[clamp(9.5px,0.85vw,11.5px)]">
              <input
                type="checkbox"
                className="mt-[1px] h-2.5 w-2.5 shrink-0 cursor-pointer rounded border-white/50 accent-purple md:h-3.5 md:w-3.5"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="whitespace-nowrap text-center">
                He leído y acepto los{' '}
                <LegalLinks
                  linkClassName="cursor-pointer underline font-medium text-lavender transition hover:text-white active:text-purple"
                  separator={
                    <>
                      {' / '}
                      <br />
                    </>
                  }
                />
              </span>
            </label>

            {/* Botón de solicitud */}
            <button
              type="button"
              onClick={handleCall}
              disabled={loading || !canSubmit}
              className={`mx-auto mt-2 block w-[90%] rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase text-purple shadow-md transition duration-300 md:mt-3.5 md:w-auto md:px-[clamp(20px,2.5vw,32px)] md:py-[clamp(6px,0.6vw,10px)] md:text-[clamp(11px,1vw,14px)] ${
                canSubmit && !loading
                  ? 'cursor-pointer hover:-translate-y-1 hover:scale-105 hover:bg-purple hover:text-white hover:shadow-[0_12px_24px_rgba(138,56,245,0.5)] active:scale-95'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {loading ? 'Enviando...' : 'Solicitar llamada'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/30 pt-3 text-[7.5px] leading-relaxed max-md:text-center md:mt-6 md:pt-4 md:text-[clamp(11px,1vw,14px)]">
        <div className="max-md:flex max-md:items-center max-md:justify-center max-md:gap-2 max-md:whitespace-nowrap">
          <p className="inline md:block">{footerData.companyName}</p>
          <span className="inline md:hidden">
            {footerData.legalLinks.map((link, index) => (
              <span key={link.label}>
                <a href={link.href} onClick={(e) => openLegal(e, index)} className="transition-colors active:text-purple active:underline">{link.label}</a>
                {index < footerData.legalLinks.length - 1 && ' / '}
              </span>
            ))}
          </span>
        </div>
        <p className="mt-1 hidden flex-wrap gap-x-2 md:flex">
          {footerData.legalLinks.map((link, index) => (
            <span key={link.label}>
              <a href={link.href} onClick={(e) => openLegal(e, index)} className="hover:underline">{link.label}</a>
              {index < footerData.legalLinks.length - 1 && ' /'}
            </span>
          ))}
        </p>
      </div>

      {/* Modal de Términos / Privacidad */}
      {legal &&
        createPortal(
          <LegalModal
            title={legalDocs[legal].title}
            blocks={legalDocs[legal].blocks}
            onClose={() => setLegal(null)}
          />,
          document.body,
        )}

      {/* Modal grande de ÉXITO ("Solicitud recibida") */}
      {sent &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSent(false)}
          >
            <div
              className="relative w-full max-w-[340px] animate-[modal-in_0.3s_ease-out] rounded-[28px] bg-dark px-6 pb-7 pt-9 text-center text-white md:max-w-[460px] md:px-10 md:pb-9 md:pt-11"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSent(false)}
                aria-label="Cerrar"
                className="absolute right-4 top-3 text-xl leading-none text-white/70 hover:text-white md:right-5 md:top-4 md:text-2xl"
              >
                ✕
              </button>

              <SuccessMessage />
            </div>
          </div>,
          document.body
        )}

      {/* Modal grande de ERROR ("Ocurrió un error") */}
      <ErrorModal isOpen={failed} onClose={() => setFailed(false)} />
    </footer>
  );
}

export default Footer;