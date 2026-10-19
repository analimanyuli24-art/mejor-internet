import { useState } from 'react';
import { sendLead, isValidPhone } from '../../services/leadService';
import SuccessMessage from '../CallRequest/SuccessMessage';
import LegalLinks from '../legal/LegalLinks';
import botonSolicitar from '../../assets/images/badge-movil1.png';

function HeroLeadForm() {
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const formatPhone = (digits: string) =>
    digits.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ');

  const handleSubmit = async () => {
    if (!isValidPhone(phone)) return setError('Ingresa un número de 9 dígitos.');
    if (!accepted) return setError('Debes aceptar los Términos y Condiciones y la Política de Privacidad.');

    const result = await sendLead({ phone, acceptedPrivacy: accepted, source: 'hero' });
    if (result.ok) setSent(true);
    else setError(result.message ?? 'Error al enviar.');
  };

  return (
    <aside className="w-[85%] max-w-[300px] rounded-[20px] bg-dark p-4 text-center text-white shadow-2xl md:w-full md:max-w-[34vw] md:rounded-[1.4vw] md:p-[1.4vw] md:shadow-[0_0_1.6vw_0.4vw_rgba(40,10,80,0.5)] md:max-lg:mt-[5vw]">
      {sent ? (
        <SuccessMessage />
      ) : (
        <>
          <h2 className="text-[20px] font-semibold leading-tight md:text-[2vw]">
            No esperes<br />en línea
          </h2>
          <p className="text-center text-[11px] leading-snug md:text-[1vw]">
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
            className="mt-3 h-8 w-[88%] rounded-full border border-white/50 bg-transparent px-3 text-center !text-[15px] placeholder:text-[10px] placeholder:text-white/60 md:mt-[0.8vw] md:h-[3vw] md:w-[92%] md:px-[0.5vw] md:text-center md:!text-[1.1vw] md:placeholder:text-[0.9vw]"
          />
          <p className="mt-1 text-[9px] md:mt-[0.7vw] md:text-[0.9vw]">*Ingrese su número sin anteponer el (51)</p>

          <label className="mt-1 flex items-start justify-center gap-1.5 text-[9px] md:mt-[0.4vw] md:items-start md:gap-[0.5vw] md:text-[0.8vw]">
            <input
              type="checkbox"
              className="mt-[0.0em] h-3 w-3 shrink-0 md:-mt-[0.1vw] md:h-[1.2vw] md:w-[1.1vw]"
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
          {error && <p className="mt-1 text-[9px] text-green md:mt-[0.4vw] md:text-[0.8vw]">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className="mx-auto -mt-1 block w-[55%] transition duration-300 ease-out hover:scale-105 md:mt-[0.9vw] md:w-[80%]"
          >
            <img src={botonSolicitar} alt="Solicitar llamada" className="block h-auto w-full" />
          </button>
        </>
      )}
    </aside>
  );
}

export default HeroLeadForm;