import axios from 'axios';
import type { LeadData, LeadResult } from '../types/lead.types';
import { isCampaignN1, CAMPAIGN_N1 } from './trafficSource';

const IP_ENDPOINT = 'https://api.ipify.org?format=json';

const QUEUE_PRINCIPAL = '263'; // mejor-internet(callme)
const QUEUE_N1 = '264';        // mejor-internetN1(callme)

async function getClientIp(): Promise<string> {
  try {
    const { data } = await axios.get<{ ip: string }>(IP_ENDPOINT);
    return data.ip ?? '';
  } catch {
    return '';
  }
}

// URL canónica de cada landing, sin utm/gclid ni rutas internas
function getCompleteUrl(): string {
  const base = `${window.location.origin}/`;
  return isCampaignN1() ? `${base}?T-source=${CAMPAIGN_N1}` : base;
}

export async function sendLead(data: LeadData): Promise<LeadResult> {
  try {
    const ip = await getClientIp();
    const queueId = isCampaignN1() ? QUEUE_N1 : QUEUE_PRINCIPAL;

    await axios.post(
      'https://crm.develz.com:4004/call-me',
      { queueId, number: data.phone, ip },
      { headers: { 'X-URL-Complete': getCompleteUrl() } },
    );

    return { ok: true };
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    return {
      ok: false,
      message: status
        ? `Error del servidor (${status})`
        : 'No se pudo conectar. Intenta de nuevo.',
    };
  }
}

export function isValidPhone(phone: string): boolean {
  return /^\d{9}$/.test(phone);
}