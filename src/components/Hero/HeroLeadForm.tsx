import { useState } from 'react';
import { createPortal } from 'react-dom';
import { sendLead, isValidPhone } from '../../services/leadService';
import SuccessMessage from '../CallRequest/SuccessMessage';
import LegalLinks from '../legal/LegalLinks';
import botonSolicitar from '../../assets/images/badge-movil1.png';
import {getDisplayPhone,getPhoneLink,} from '../../services/contactPhone';

function HeroLeadForm() {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatPhone = (digits: string) =>
    digits.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ');

  const handleSubmit = async () => {
    if (loading) return;
    if (!isValidPhone(phone)) return setError('Ingresa un número de 9 dígitos.');
    if (!accepted) return setError('Debes aceptar los Términos y Condiciones y la Política de Privacidad.');

    setError('');
    navigator.vibrate?.(50);
    setLoading(true);
    try {
      const result = await sendLead({ phone, acceptedPrivacy: accepted, source: 'hero' });
      if (result.ok) setSent(true);
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setPhone('');
    setAccepted(false);
    setError('');
  };

  const handleCloseError = () => setFailed(false);

  return (
    <>
      <aside className="w-[85%] max-w-[300px] rounded-[20px] bg-dark p-4 text-center text-white shadow-2xl md:w-full md:max-w-[34vw] md:rounded-[1.4vw] md:p-[1.4vw] md:shadow-[0_0_1.6vw_0.4vw_rgba(40,10,80,0.5)] md:max-lg:mt-[5vw] md:max-lg:max-w-[40vw] md:max-lg:p-[1.2vw] lg:max-w-[24vw] lg:rounded-[1vw] lg:p-[1vw]">
        <h2 className="text-[20px] font-semibold leading-tight md:text-[2vw] md:max-lg:text-[1.6vw] lg:text-[1.8vw]">
          No esperes<br />en línea
        </h2>
        <p className="text-center text-[11px] leading-snug md:text-[1vw] md:max-lg:text-[0.8vw] lg:text-[0.95vw]">
          Ingresa tu número y un asesor
          <br />
          te llamará en menos de 5 minutos
          <br />
          con la mejor tarifa.
        </p>

        <input
          type="tel"
          value={formatPhone(phone)}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
          placeholder="Ingresa tu número de teléfono"
          className="mt-3 h-8 w-[88%] rounded-full border border-white/50 bg-transparent px-3 text-center !text-[15px] placeholder:text-[10px] placeholder:text-white/60 md:mt-[0.8vw] md:h-[3vw] md:w-[92%] md:px-[0.5vw] md:text-center md:!text-[1.1vw] md:placeholder:text-[0.9vw] md:max-lg:mt-[0.7vw] md:max-lg:h-[2.4vw] md:max-lg:!text-[0.9vw] md:max-lg:placeholder:text-[0.7vw] lg:mt-[0.9vw] lg:h-[2.8vw] lg:!text-[1vw] lg:placeholder:text-[0.85vw]"
        />
        <p className="mt-1 text-[9px] md:mt-[0.7vw] md:text-[0.9vw] md:max-lg:mt-[0.1vw] md:max-lg:text-[0.7vw] lg:mt-[0.6vw] lg:text-[0.9vw]">
          *Ingrese su número sin anteponer el (51)
        </p>

        <label className="mt-1 flex items-start justify-center gap-1.5 text-[9px] md:mt-[0.4vw] md:items-start md:gap-[0.5vw] md:text-[0.8vw] md:max-lg:mt-[0.3vw] md:max-lg:text-[0.65vw] lg:mt-[0.4vw] lg:gap-[0.4vw] lg:text-[0.8vw]">
          <input
            type="checkbox"
            className="mt-[0.0em] h-3 w-3 shrink-0 md:-mt-[0.1vw] md:h-[1.2vw] md:w-[1.1vw] md:max-lg:h-[1vw] md:max-lg:w-[0.9vw] lg:-mt-[0.1vw] lg:h-[1.1vw] lg:w-[1.1vw]"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span className="relative -left-[2px] whitespace-nowrap text-center">
            He leído y acepto los{' '}
            <LegalLinks
              linkClassName="cursor-pointer underline transition hover:text-purple active:text-purple active:opacity-70"
              separator={
                <>
                  {' / '}
                  <br />
                </>
              }
            />
          </span>
        </label>
        {error && <p className="mt-1 text-[9px] text-green md:mt-[0.4vw] md:text-[0.8vw] lg:text-[0.8vw]">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="relative mx-auto -mt-1 block w-[55%] transition duration-150 ease-out active:scale-90 active:brightness-75 disabled:cursor-wait disabled:opacity-80 md:mt-[0.9vw] md:w-[80%] md:hover:scale-105 md:max-lg:mt-[0.8vw] md:max-lg:w-[46%] lg:-mt-[0.5vw] lg:w-[68%]"
        >
          <img src={botonSolicitar} alt="Solicitar llamada" className="block h-auto w-full" />
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent md:h-[1.4vw] md:w-[1.4vw]" />
            </span>
          )}
        </button>

        <div className="-mx-4 mt-3 md:-mx-[1.4vw] md:mt-[0.9vw] md:max-lg:-mx-[1.2vw] md:max-lg:mt-[0.8vw] lg:-mx-[1vw] lg:mt-[0.0vw]">
          <p className="bg-[#c8bcf7] px-3 py-2 text-[11px] font-bold text-[#1a0b33] md:py-[0.6vw] md:text-[1vw] md:max-lg:py-[0.35vw] md:max-lg:text-[0.75vw] lg:py-[0.5vw] lg:text-[0.9vw]">
            ¿Te gustaría conversar ahora mismo?
          </p>

          <p className="px-3 pt-2 text-[10px] leading-snug md:pt-[0.5vw] md:text-[0.9vw] md:max-lg:pt-[0.3vw] md:max-lg:text-[0.7vw] lg:pt-[0.5vw] lg:text-[0.9vw]">
            Llámanos al{' '}
            <a href={getPhoneLink()} className="font-bold underline">
              {getDisplayPhone()}
            </a>{' '}
            y uno de
            <br className="hidden lg:block" />{' '}
            nuestros asesores te atenderá con gusto.
          </p>
        </div>
      </aside>

      {sent &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={handleClose}
          >
            <div
              className="relative w-full max-w-[340px] animate-[modal-in_0.3s_ease-out] rounded-[28px] bg-dark px-6 pb-7 pt-9 text-center text-white md:max-w-[460px] md:px-10 md:pb-9 md:pt-11"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
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

      {failed &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={handleCloseError}
          >
            <div
              role="alert"
              className="relative w-full max-w-[340px] animate-[modal-in_0.3s_ease-out] rounded-[28px] bg-dark px-6 pb-7 pt-9 text-center text-white md:max-w-[460px] md:px-10 md:pb-9 md:pt-11"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseError}
                aria-label="Cerrar"
                className="absolute right-4 top-3 text-xl leading-none text-white/70 hover:text-white md:right-5 md:top-4 md:text-2xl"
              >
                ✕
              </button>

              <h3 className="flex items-center justify-center gap-3 whitespace-nowrap text-2xl font-bold leading-tight md:text-4xl">
                <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 md:h-9 md:w-9" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#ef4444" />
                  <path
                    d="M8 8l8 8M16 8l-8 8"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                Ocurrió un error
              </h3>

              <p className="mx-auto mt-3 text-xs leading-snug md:mt-4 md:text-base">
                No pudimos enviar tu solicitud.
                <br />
                Por favor, vuelve a intentarlo.
              </p>

              <button
                type="button"
                onClick={handleCloseError}
                className="mt-5 rounded-full bg-white px-8 py-2 text-sm font-bold text-[#1a0b33] transition active:scale-95 md:text-base"
              >
                Reintentar
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default HeroLeadForm;