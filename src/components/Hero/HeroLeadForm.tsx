import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from '../CallRequest/SuccessMessage';

// FORMULARIO "No esperes en línea" del hero.
// GUÍA: celular título text-3xl · PC md:text-5xl · ancho máximo max-w-[420px]

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
    <aside className="w-full max-w-[420px] rounded-[24px] bg-dark p-5 text-center text-white shadow-2xl md:rounded-[28px] md:p-8">
      {sent ? (
        <SuccessMessage />
      ) : (
        <>
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            No esperes<br />en línea
          </h2>
          <p className="mt-3 text-sm leading-snug md:mt-4 md:text-lg">
            Ingresa tu número y un asesor te llamará en menos de 5 minutos con la mejor tarifa.
          </p>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número de teléfono"
            className="mt-5 h-11 w-full rounded-full border border-white/50 bg-transparent px-4 text-sm placeholder:text-white/60 md:mt-6 md:h-14 md:px-6 md:text-lg"
          />
          <p className="mt-2 text-xs md:text-base">*Ingrese su número sin anteponer el (51)</p>

          <label className="mt-3 flex items-start justify-center gap-2 text-left text-xs md:text-base">
            <input type="checkbox" className="mt-0.5 shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>He leído y acepto la <u>Política de Privacidad</u></span>
          </label>

          {error && <p className="mt-3 text-sm text-green">{error}</p>}

          <div className="mt-5 md:mt-6">
            <Button size="lg" onClick={handleSubmit}>Solicitar llamada</Button>
          </div>
        </>
      )}
    </aside>
  );
}

export default HeroLeadForm;