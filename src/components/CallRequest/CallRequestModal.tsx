import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from './SuccessMessage';
import LegalLinks from '../legal/LegalLinks';

interface CallRequestModalProps {
  isOpen: boolean;
  planId?: string;
  onClose: () => void;
}

const formatPhoneInput = (digits: string) => digits.replace(/(\d{3})(?=\d)/g, '$1 ');

function CallRequestModal({ isOpen, planId, onClose }: CallRequestModalProps) {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 9));
  };

  const handleSubmit = async () => {
    if (!isValidPhone(phone)) return setError('Ingresa un número de 9 dígitos.');
    if (!accepted) return setError('Debes aceptar los Términos y Condiciones y la Política de Privacidad.');

    const result = await sendLead({ phone, acceptedPrivacy: accepted, source: 'plan-modal', planId });
    if (result.ok) setSent(true);
    else setError(result.message ?? 'Error al enviar.');
  };

  const handleClose = () => {
    setSent(false);
    setPhone('');
    setAccepted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={handleClose}>
      <div
        className="relative w-full max-w-[300px] animate-[modal-in_0.3s_ease-out] rounded-[20px] bg-dark p-4 text-center text-white md:max-w-lg md:rounded-[28px] md:p-8 lg:max-w-[380px] lg:rounded-[22px] lg:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-2 top-2 px-2 text-xl leading-none text-white/70 hover:text-white md:right-5 md:top-5 md:text-2xl lg:right-3 lg:top-3 lg:text-lg"
        >
          ✕
        </button>

        {sent ? (
          <SuccessMessage />
        ) : (
          <>
            <h3 className="px-4 text-2xl font-bold leading-tight md:px-0 md:text-5xl lg:text-[32px]">
              ¡Buena elección!
            </h3>
            <p className="mt-2 text-xs leading-snug md:mt-3 md:text-[18px] lg:mt-2 lg:text-[14px]">
              Déjanos tu número y te contactaremos<br />
              para asesorarte sin compromiso.
            </p>

            <input
              type="tel"
              inputMode="numeric"
              value={formatPhoneInput(phone)}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="Ingresa tu número de teléfono"
              className="mt-4 h-10 w-[90%] rounded-full border border-white/60 bg-transparent px-4 text-center text-base tracking-wide placeholder:text-sm placeholder:tracking-normal placeholder:text-white/60 md:mt-6 md:h-12 md:w-[80%] md:px-5 md:text-lg md:placeholder:text-base lg:mt-4 lg:h-9 lg:w-[80%] lg:px-4 lg:text-sm lg:placeholder:text-xs"
            />
            <p className="mt-3 text-xs md:text-[17px] lg:mt-2 lg:text-[13px]">*Ingrese su número sin anteponer el (51)</p>

            <label className="mt-3 flex items-start justify-center gap-1.5 text-[10px] md:mt-3 md:gap-2 md:text-[17px] lg:mt-2 lg:gap-1.5 lg:text-[13px]">
              <input
                type="checkbox"
                className="mt-[0.1em] h-4 w-4 shrink-0 md:mt-[0.1em] md:h-5 md:w-5 lg:h-3.5 lg:w-3.5"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="whitespace-nowrap text-center">
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

            {error && <p className="mt-2 text-xs text-green md:mt-3 md:text-base lg:text-[13px]">{error}</p>}

            <div className="mt-4 flex justify-center md:mt-6 lg:mt-4">
              <Button
                variant="light"
                size="sm"
                className="md:px-10 md:py-3 md:text-lg lg:px-8 lg:py-2 lg:text-[15px]"
                onClick={handleSubmit}
              >
                Solicitar llamada
              </Button>
            </div>

              <div className="-mx-4 mt-4 md:-mx-8 md:mt-6 lg:-mx-6 lg:mt-4">
              <p className="bg-[#c8bcf7] px-3 py-2 text-[11px] font-bold text-[#1a0b33] md:py-3 md:text-[17px] lg:py-2 lg:text-[14px]">
                ¿Te gustaría conversar ahora mismo?
              </p>
              <p className="px-3 pt-2 text-[10px] leading-snug md:pt-3 md:text-[15px] lg:pb-1 lg:pt-2 lg:text-[13px]">
                Llámanos al{' '}
                <a href="tel:+5117012045" className="font-bold underline">01 7012045</a>{' '}
                y uno de
                <br className="hidden lg:block" />{' '}
                nuestros asesores te atenderá con gusto.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CallRequestModal;