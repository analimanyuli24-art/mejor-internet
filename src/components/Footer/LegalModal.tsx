import { useEffect, type ReactNode } from 'react';
import type { LegalBlock } from '../../data/legalData';

interface LegalModalProps {
  title: string;
  blocks: LegalBlock[];
  onClose: () => void;
}

const linkClass = 'text-[#1a56db] underline break-all';

// Frases en negrita y enlaces que aparecen dentro del texto legal.
const boldPhrases = [
  'DACARTELECOM S.A.C.',
  'Ley N.º 29733 – Ley de Protección de Datos Personales',
];
const linkPhrases = ['www.mejorinternetperu.com', 'marketing@dacartelecom.com'];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(
  `(${[...linkPhrases, ...boldPhrases].map(escapeRegex).join('|')})`,
);

// Convierte negritas y enlaces dentro del texto.
const formatText = (text: string): ReactNode[] =>
  text.split(pattern).map((part, i) => {
    if (part === 'www.mejorinternetperu.com') {
      return (
        <a key={i} href="https://www.mejorinternetperu.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    }
    if (part === 'marketing@dacartelecom.com') {
      return (
        <a key={i} href="mailto:marketing@dacartelecom.com" className={`font-bold ${linkClass}`}>
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-[20px] bg-white text-left text-dark shadow-xl md:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-dark/10 px-5 py-4 md:px-8">
          <h2 className="text-base font-bold md:text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-2xl leading-none text-dark/70 hover:text-dark"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 text-[13px] leading-relaxed md:px-8 md:py-6 md:text-[15px]">
          {blocks.map((b, i) => {
            if (b.t === 'h') return <h3 key={i} className="mt-5 font-bold first:mt-0">{b.x}</h3>;
            if (b.t === 'li') return <p key={i} className="ml-5">• {formatText(b.x)}</p>;
            return <p key={i} className="mt-2">{formatText(b.x)}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default LegalModal;