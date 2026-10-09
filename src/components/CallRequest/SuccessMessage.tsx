function SuccessMessage() {
  return (
    <div className="rounded-[24px] bg-dark px-5 py-6 text-center text-white md:rounded-[28px] md:px-8 md:py-10">
      <div className="flex items-center justify-center gap-3 md:gap-4">
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 md:h-10 md:w-10" aria-hidden="true">
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
        <p className="text-2xl font-bold md:text-4xl">Solicitud recibida</p>
      </div>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-snug md:mt-4 md:text-lg">
        Uno de nuestros asesores expertos te llamará en los próximos 5 minutos para facilitar la información.
      </p>
    </div>
  );
}

export default SuccessMessage;