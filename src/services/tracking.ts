declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type FormSource = 'hero' | 'plan-modal' | 'footer';

/**
 * Dispara el evento personalizado 'formSubmit' a Google Tag Manager.
 * No envía datos personales (sin teléfono, sin nombre, sin IP) cumpliendo
 * con las políticas de privacidad de Google Ads.
 */
export function trackFormSubmit(source?: FormSource): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'formSubmit',
    form_name: 'mejor_internet_peru',
    form_status: 'success',
    ...(source ? { form_source: source } : {}),
  });
}