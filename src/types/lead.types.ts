// Datos que se envían desde cualquier formulario de la página.
export interface LeadData {
  phone: string;
  acceptedPrivacy: boolean;
  source: 'hero' | 'plan-modal' | 'footer' | 'faq';
  planId?: string;           // plan que se estaba viendo al pedir la llamada
}

export interface LeadResult {
  ok: boolean;
  message?: string;
}
