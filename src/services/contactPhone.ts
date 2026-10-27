import { isCampaignN1 } from './trafficSource';

const PHONE_PRINCIPAL = '017012045';
const PHONE_N1 = '017012060';

export function getContactPhone(): string {
  return isCampaignN1() ? PHONE_N1 : PHONE_PRINCIPAL;
}

export function getDisplayPhone(): string {
  return isCampaignN1() ? '01 7012060' : '01 7012045';
}

export function getPhoneLink(): string {
  return `tel:+51${getContactPhone()}`;
}