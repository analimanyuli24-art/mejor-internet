function SuccessMessage() {
  return (
    <div className="text-white">
      <h3 className="flex items-center justify-center gap-3 whitespace-nowrap text-2xl font-bold leading-tight md:text-4xl">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 shrink-0 md:h-9 md:w-9"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="12" fill="white" />
          <path
            d="M7 12.5l3.2 3.2L17 9"
            fill="none"
            stroke="#1a0b33"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Solicitud recibida
      </h3>

      <p className="mx-auto mt-3 text-xs leading-snug md:mt-4 md:text-base">
        Uno de nuestros asesores expertos te
        <br />
        llamará en los próximos 5 minutos para
        <br />
        facilitarte la información.
      </p>
    </div>
  );
}

export default SuccessMessage;