import { useEffect, type ReactNode } from 'react';
import type { LegalBlock } from '../../data/legalData';

interface LegalModalProps {
  title: string;
  blocks: LegalBlock[];
  onClose: () => void;
}

const linkClass =
  'text-[#7028e4] underline decoration-[#b794f6] underline-offset-2 break-all transition-colors hover:text-[#4c0caa]';

// Frases que aparecerán en negrita.
const boldPhrases = [
  'DACARTELECOM S.A.C.',
  'Ley N.º 29733 – Ley de Protección de Datos Personales',
];

// Textos que se convertirán en enlaces.
const linkPhrases = [
  'www.mejorinternetperu.com',
  'marketing@dacartelecom.com',
];

// Escapa los caracteres especiales para crear la expresión regular.
const escapeRegex = (s: string) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pattern = new RegExp(
  `(${[...linkPhrases, ...boldPhrases].map(escapeRegex).join('|')})`,
);

// Convierte el dominio y el correo en enlaces clicables.
const formatText = (text: string): ReactNode[] =>
  text.split(pattern).map((part, i) => {
    if (part === 'www.mejorinternetperu.com') {
      return (
        <a
          key={i}
          href="https://www.mejorinternetperu.com"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {part}
        </a>
      );
    }

    if (part === 'marketing@dacartelecom.com') {
      return (
        <a
          key={i}
          href="mailto:marketing@dacartelecom.com"
          className={`font-bold ${linkClass}`}
        >
          {part}
        </a>
      );
    }

    if (boldPhrases.includes(part)) {
      return <strong key={i}>{part}</strong>;
    }

    return part;
  });

function LegalModal({ title, blocks, onClose }: LegalModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#160725]/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[20px] border border-[#e9ddff] bg-white text-left text-dark shadow-[0_25px_80px_rgba(28,8,54,0.35)] md:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-[#210b38] via-[#35105c] to-[#4c16a8] px-5 py-4 md:px-8">
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c5a3ff]/70 to-transparent" />

          <h2 className="text-base font-bold text-white md:text-xl">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl leading-none text-white transition-all hover:rotate-90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#c5a3ff]"
          >
            ✕
          </button>
        </div>

        {/* Contenido legal: texto original sin modificaciones */}
        <div className="overflow-y-auto bg-gradient-to-b from-white to-[#fcfaff] px-5 py-4 text-[13px] leading-relaxed text-[#342544] [scrollbar-color:#a779e8_#f4effb] [scrollbar-width:thin] md:px-8 md:py-6 md:text-[15px]">
          {blocks.map((b, i) => {
            if (b.t === 'h') {
              return (
                <h3
                  key={i}
                  className="mt-5 border-l-[3px] border-[#873cf0] pl-3 font-bold text-[#35105c] first:mt-0"
                >
                  {b.x}
                </h3>
              );
            }

            if (b.t === 'li') {
              return (
                <p key={i} className="ml-5 text-[#49385a]">
                  <span className="mr-1 font-bold text-[#873cf0]">•</span>
                  {formatText(b.x)}
                </p>
              );
            }

            return (
              <p key={i} className="mt-2 text-[#49385a]">
                {formatText(b.x)}
              </p>
            );
          })}
        </div>

        {/* Detalle decorativo inferior */}
        <div className="h-1 shrink-0 bg-gradient-to-r from-[#5311a8] via-[#a044ff] to-[#7c3aed]" />
      </div>
    </div>
  );
}

export default LegalModal;