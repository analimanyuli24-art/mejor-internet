import { createPortal } from 'react-dom';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

function ErrorModal({ isOpen, onClose, onRetry }: ErrorModalProps) {
  if (!isOpen) return null;

  const handleRetry = () => {
    onClose();
    if (onRetry) onRetry();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="alert"
        className="relative w-full max-w-[340px] animate-[modal-in_0.3s_ease-out] rounded-[28px] bg-dark px-6 pb-7 pt-9 text-center text-white md:max-w-[460px] md:px-10 md:pb-9 md:pt-11"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-3 text-xl leading-none text-white/70 hover:text-white md:right-5 md:top-4 md:text-2xl"
        >
          ✕
        </button>

        <h3 className="flex items-center justify-center gap-3 whitespace-nowrap text-2xl font-bold leading-tight md:text-4xl">
          <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 md:h-9 md:w-9" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#ef4444" />
            <path
              d="M8 8l8 8M16 8l-8 8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          Ocurrió un error
        </h3>

        <p className="mx-auto mt-3 text-xs leading-snug md:mt-4 md:text-base">
          No pudimos enviar tu solicitud.
          <br />
          Por favor, vuelve a intentarlo.
        </p>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-5 rounded-full bg-white px-8 py-2 text-sm font-bold text-[#1a0b33] transition active:scale-95 md:text-base"
        >
          Reintentar
        </button>
      </div>
    </div>,
    document.body
  );
}

export default ErrorModal;