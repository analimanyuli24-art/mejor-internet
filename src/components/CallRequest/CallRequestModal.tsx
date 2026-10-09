import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from './SuccessMessage';

// MODAL "¡Buena elección!": pide el número para que un asesor llame.
// El envío real está en services/leadService.ts (no aquí).
//
// GUÍA DE AJUSTES:
// - ANCHO: max-w-lg (más grande = max-w-xl o max-w-2xl)
// - TÍTULO: text-4xl | TEXTOS: text-base / text-lg
// - CAMPO DE TELÉFONO: h-14 (alto) y text-lg (letra)
// - BOTÓN: size="lg" (más grande = "xl")

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
        className="relative w-full max-w-lg animate-[modal-in_0.3s_ease-out] rounded-[28px] bg-dark p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 text-2xl text-white/70 hover:text-white"
        >
          ✕
        </button>

        {sent ? (
          <SuccessMessage />
        ) : (
          <>
            <h3 className="text-center text-4xl font-bold">¡Buena elección!</h3>
            <p className="mt-3 text-center text-base">
              Déjanos tu número y te contactaremos para asesorarte sin compromiso.
            </p>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de teléfono"
              className="mt-6 h-14 w-full rounded-full border border-white/40 bg-transparent px-6 text-lg placeholder:text-white/60"
            />
            <p className="mt-2 text-sm">*Ingrese su número sin anteponer el (51)</p>

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              He leído y acepto la <u>Política de Privacidad</u>
            </label>

            {error && <p className="mt-3 text-center text-base text-green">{error}</p>}

            <div className="mt-6 flex justify-center">
              <Button size="lg" onClick={handleSubmit}>Solicitar llamada</Button>
            </div>

            <div className="-mx-8 -mb-8 mt-7 rounded-b-[28px] bg-lavender px-8 py-5 text-center text-base text-dark">
              <p className="font-semibold">¿Te gustaría conversar ahora mismo?</p>
              <p>
                Llámanos al <b>01 7012004</b> y uno de nuestros asesores te atenderá con gusto.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CallRequestModal;