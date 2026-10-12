import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from '../CallRequest/SuccessMessage';

// FORMULARIO "No esperes en línea" del hero.
// GUÍA: todos los tamaños usan clamp(mínimo, ideal, máximo).
// Más grande = sube el máximo · más chico = baja el mínimo · ancho = max-w-[clamp(...)]

function HeroLeadForm() {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!isValidPhone(phone)) return setError('Ingresa un número de 9 dígitos.');
    if (!accepted) return setError('Debes aceptar la Política de Privacidad.');

    const result = await sendLead({ phone, acceptedPrivacy: accepted, source: 'hero' });
    if (result.ok) setSent(true);
    else setError(result.message ?? 'Error al enviar.');
  };

  return (
    <aside className="w-full max-w-[clamp(260px,24vw,340px)] rounded-[clamp(16px,1.5vw,24px)] bg-dark p-[clamp(14px,1.5vw,24px)] text-center text-white shadow-2xl">
      {sent ? (
        <SuccessMessage />
      ) : (
        <>
          <h2 className="text-[clamp(22px,2.2vw,34px)] font-semibold leading-tight">
            No esperes<br />en línea
          </h2>
          <p className="mt-2 text-[clamp(11px,1vw,15px)] leading-snug">
            Ingresa tu número y un asesor te llamará en menos de 5 minutos con la mejor tarifa.
          </p>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número de teléfono"
            className="mt-4 h-[clamp(36px,3vw,44px)] w-full rounded-full border border-white/50 bg-transparent px-4 text-[clamp(11px,1vw,14px)] placeholder:text-white/60"
          />
          <p className="mt-2 text-[clamp(10px,0.85vw,12px)]">*Ingrese su número sin anteponer el (51)</p>

          <label className="mt-2 flex items-start justify-center gap-2 text-left text-[clamp(10px,0.9vw,13px)]">
            <input type="checkbox" className="mt-0.5 shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>He leído y acepto la <u>Política de Privacidad</u></span>
          </label>

          {error && <p className="mt-2 text-[clamp(10px,0.9vw,13px)] text-green">{error}</p>}

          <div className="mt-4">
            <Button size="lg" onClick={handleSubmit}>Solicitar llamada</Button>
          </div>
        </>
      )}
    </aside>
  );
}

export default HeroLeadForm;