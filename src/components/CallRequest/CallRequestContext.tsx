import { createContext, useContext, useState, type ReactNode } from 'react';
import CallRequestModal from './CallRequestModal';

// CONTROL GLOBAL DEL MODAL "¡Buena elección!"
// Cualquier botón de la página ("Saber más", "Solicitar más información")
// llama openCallRequest(). Así no hay que pasar props por toda la página.

interface CallRequestContextValue {
  openCallRequest: (planId?: string) => void;
}

const CallRequestContext = createContext<CallRequestContextValue | null>(null);

export function CallRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>();

  const openCallRequest = (id?: string) => {
    setPlanId(id);
    setIsOpen(true);
  };

  return (
    <CallRequestContext.Provider value={{ openCallRequest }}>
      {children}
      <CallRequestModal
        isOpen={isOpen}
        planId={planId}
        onClose={() => setIsOpen(false)}
      />
    </CallRequestContext.Provider>
  );
}

export function useCallRequest() {
  const context = useContext(CallRequestContext);
  if (!context) {
    throw new Error('useCallRequest debe usarse dentro de CallRequestProvider');
  }
  return context;
}
