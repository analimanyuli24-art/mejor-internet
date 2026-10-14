import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import Button from '../ui/Button';
import SuccessMessage from '../CallRequest/SuccessMessage';

// FORMULARIO "No esperes en línea".
// CELULAR: tamaños fijos en px, debajo de la imagen.
// TABLET Y PC (md+): todo en vw, en la columna derecha.

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
    <aside className="w-[85%] max-w-[300px] rounded-[20px] bg-dark p-4 text-center text-white shadow-2xl md:w-full md:max-w-[22vw] md:rounded-[1.4vw] md:p-[1.2vw]">
      {sent ? (
        <SuccessMessage />
      ) : (
        <>
          <h2 className="text-[20px] font-semibold leading-tight md:text-[2vw]">
            No esperes<br />en línea
          </h2>
          <p className="mt-1 text-[11px] leading-snug md:mt-[0.4vw] md:text-[0.95vw]">
            Ingresa tu número y un asesor te llamará en menos de 5 minutos con la mejor tarifa.
          </p>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número de teléfono"
            className="mt-3 h-9 w-full rounded-full border border-white/50 bg-transparent px-3 text-[12px] placeholder:text-white/60 md:mt-[0.8vw] md:h-[2.6vw] md:px-[0.8vw] md:text-[0.9vw]"
          />
          <p className="mt-1 text-[9px] md:mt-[0.4vw] md:text-[0.8vw]">*Ingrese su número sin anteponer el (51)</p>

          <label className="mt-1 flex items-start justify-center gap-1 text-left text-[9px] md:mt-[0.4vw] md:gap-[0.4vw] md:text-[0.8vw]">
            <input type="checkbox" className="mt-0.5 shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>He leído y acepto la <u>Política de Privacidad</u></span>
          </label>

          {error && <p className="mt-1 text-[9px] text-green md:mt-[0.4vw] md:text-[0.8vw]">{error}</p>}

          <div className="mt-3 md:mt-[0.8vw]">
                       <Button size="sm" className="md:px-4 md:py-1 md:text-[11px] xl:px-10 xl:py-3 xl:text-lg" onClick={handleSubmit}>Solicitar llamada</Button>
          </div>
        </>
      )}
    </aside>
  );
}

export default HeroLeadForm;