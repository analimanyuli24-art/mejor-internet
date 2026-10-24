import { getTrafficSource } from './trafficSource';

export function getContactPhone(): string {
  return getTrafficSource() === 'campN1'
    ? '017012060'
    : '017012045';
}

export function getDisplayPhone(): string {
  return getTrafficSource() === 'campN1'
    ? '01 7012060'
    : '01 7012045';
}

export function getPhoneLink(): string {
  return `tel:+51${getContactPhone()}`;
}