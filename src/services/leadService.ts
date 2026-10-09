import type { LeadData, LeadResult } from '../types/lead.types';

// ============================================================
// ÚNICO LUGAR DONDE SE CONECTA EL ENVÍO DE FORMULARIOS
// Todos los formularios (hero, modal "Saber más", footer, FAQ)
// llaman a sendLead(). Cuando la empresa dé su servicio,
// reemplaza SOLO el contenido de esta función.
// ============================================================

// TODO: CONECTAR AQUÍ AL SERVICIO DE LA EMPRESA
// Endpoint, método y formato de datos se definen cuando la empresa los entregue.
const LEAD_ENDPOINT = ''; // TODO: AGREGAR URL DEL SERVICIO DE LA EMPRESA

export async function sendLead(data: LeadData): Promise<LeadResult> {
  // Mientras no exista endpoint, solo registramos el envío para probar la interfaz.
  if (!LEAD_ENDPOINT) {
    console.info('[leadService] Envío simulado (sin endpoint):', data);
    return { ok: true };
  }

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { ok: false, message: 'No se pudo enviar tu solicitud. Intenta de nuevo.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: 'Error de conexión. Intenta de nuevo.' };
  }
}

// Valida el número peruano sin anteponer el (51): 9 dígitos que empiezan en 9 o en 01 fijo.
// TODO: CONFIRMAR REGLA DE VALIDACIÓN CON LA EMPRESA
export function isValidPhone(phone: string): boolean {
  return /^\d{9}$/.test(phone.trim());
}
