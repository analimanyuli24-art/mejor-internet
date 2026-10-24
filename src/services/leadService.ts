import axios from 'axios';
import type { LeadData, LeadResult } from '../types/lead.types';
import { getTrafficSource } from './trafficSource';

const IP_ENDPOINT = 'https://api.ipify.org?format=json';

// Cola de contactos entrantes normales
const QUEUE_ORGANICA = '263';

// Cola de la campaña Hogar N1
const QUEUE_N1 = '264';

// Valor exacto del parámetro de campaña
const CAMPANA_N1 = 'campN1';

async function getClientIp(): Promise<string> {
    try {
        const { data } = await axios.get<{ ip: string }>(IP_ENDPOINT);
        return data.ip ?? '';
    } catch {
        return '';
    }
}

export async function sendLead(data: LeadData): Promise<LeadResult> {
    try {
        const ip = await getClientIp();

        // Seleccionar la cola según el origen del contacto
        const queueId =
            getTrafficSource() === CAMPANA_N1
                ? QUEUE_N1
                : QUEUE_ORGANICA;

        await axios.post(
            'https://crm.develz.com:4004/call-me',
            {
                queueId,
                number: data.phone,
                ip,
            },
            {
                headers: {
                    'X-URL-Complete': window.location.href,
                },
            },
        );

        return { ok: true };
    } catch (error) {
        const status = axios.isAxiosError(error)
            ? error.response?.status
            : undefined;

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
