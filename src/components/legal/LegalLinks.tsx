import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { legalDocs, type LegalKey } from '../../data/legalData';
import LegalModal from '../Footer/LegalModal';

const labels: Record<LegalKey, string> = {
  terms: 'Términos y Condiciones',
  privacy: 'Política de Privacidad',
};

interface LegalLinksProps {
  linkClassName?: string;
  separator?: ReactNode;
}

function LegalLinks({ linkClassName = 'underline hover:text-purple', separator = ' / ' }: LegalLinksProps) {
  const [open, setOpen] = useState<LegalKey | null>(null);

  return (
    <>
      <button type="button" onClick={() => setOpen('terms')} className={linkClassName}>
        {labels.terms}
      </button>
      {separator}
      <button type="button" onClick={() => setOpen('privacy')} className={linkClassName}>
        {labels.privacy}
      </button>

      {open &&
        createPortal(
          <LegalModal
            title={legalDocs[open].title}
            blocks={legalDocs[open].blocks}
            onClose={() => setOpen(null)}
          />,
          document.body,
        )}
    </>
  );
}

export default LegalLinks;