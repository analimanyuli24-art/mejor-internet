// Pantalla "Solicitud recibida" que aparece después de enviar el formulario.
// Se muestra dentro del modal (CallRequestModal) o en el hero si se requiere.
//
// GUÍA DE AJUSTES:
// - TAMAÑO DEL ÍCONO: h-10 w-10 (más grande = h-12 w-12)
// - TÍTULO: text-4xl (más grande = text-5xl)
// - TEXTO: text-lg, y ancho con max-w-xs (más ancho = max-w-sm)
// - ESPACIO entre título y texto: mt-4

function SuccessMessage() {
  return (
    <div className="rounded-[28px] bg-dark px-8 py-10 text-center text-white">
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="white" />
          <path
            d="M7 12.5l3.2 3.2L17 9"
            fill="none"
            stroke="#1d0b33"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-4xl font-bold">Solicitud recibida</p>
      </div>
      <p className="mx-auto mt-4 max-w-xs text-lg leading-snug">
        Uno de nuestros asesores expertos te llamará en los próximos 5 minutos para facilitar la información.
      </p>
    </div>
  );
}

export default SuccessMessage;