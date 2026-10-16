import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from './SuccessMessage';

interface CallRequestModalProps {
  isOpen: boolean;
  planId?: string;
  onClose: () => void;
}

function CallRequestModal({ isOpen, planId, onClose }: CallRequestModalProps) {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!isValidPhone(phone)) return setError('Ingresa un número de 9 dígitos.');
    if (!accepted) return setError('Debes aceptar la Política de Privacidad.');

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
        className="relative w-full max-w-[300px] animate-[modal-in_0.3s_ease-out] rounded-[20px] bg-dark p-4 text-center text-white md:max-w-lg md:rounded-[28px] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-2 top-2 px-2 text-xl leading-none text-white/70 hover:text-white md:right-5 md:top-5 md:text-2xl"
        >
          ✕
        </button>

        {sent ? (
          <SuccessMessage />
        ) : (
          <>
            <h3 className="px-4 text-2xl font-bold leading-tight md:px-0 md:text-5xl">
              ¡Buena elección!
            </h3>
            <p className="mt-2 text-xs leading-snug md:mt-3 md:text-[18px]">
              Déjanos tu número y te contactaremos<br />
              para asesorarte sin compromiso.
            </p>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de teléfono"
              className="mt-4 h-10 w-[90%] rounded-full border border-white/60 bg-transparent px-4 text-center text-sm placeholder:text-white/60 md:mt-6 md:h-12 md:w-[80%] md:px-5 md:text-base"
            />
            <p className="mt-3 text-xs md:text-[17px]">*Ingrese su número sin anteponer el (51)</p>

            <label className="mt-3 flex items-center justify-center gap-1.5 text-[11px] md:mt-3 md:gap-2 md:text-[17px]">
              <input type="checkbox" className="h-4 w-4 md:h-5 md:w-5" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              He leído y acepto la <u>Política de Privacidad</u>
            </label>

            {error && <p className="mt-2 text-xs text-green md:mt-3 md:text-base">{error}</p>}

            <div className="mt-4 flex justify-center md:mt-6">
              <Button variant="light" size="sm" className="md:px-10 md:py-3 md:text-lg" onClick={handleSubmit}>
                Solicitar llamada
              </Button>
            </div>

            <div className="-mx-4 mt-5 bg-lavender px-4 py-2 text-xs font-semibold text-dark md:-mx-8 md:mt-7 md:px-8 md:py-3 md:text-base">
              ¿Te gustaría conversar ahora mismo?
            </div>
            <p className="mx-auto mt-3 text-center text-xs leading-snug md:mt-3 md:text-[18px]">
              Llámanos al <b>01 7012004</b> y uno de<br />
              nuestros asesores te atenderá con gusto.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CallRequestModal;