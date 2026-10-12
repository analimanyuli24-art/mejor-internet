import axios from 'axios';
import type { LeadData, LeadResult } from '../types/lead.types';

const IP_ENDPOINT = 'https://api.ipify.org?format=json';
const QUEUE_ID = '1';

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

        await axios.post('https://crm.develz.com:4004/call-me', {
            queueId: QUEUE_ID,
            number:data.phone,
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