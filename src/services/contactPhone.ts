import { isCampaignN1 } from "./trafficSource";

const PHONES = {
  principal: { display: "01 7012045", tel: "+5117012045" },
  n1: { display: "01 7012060", tel: "+5117012060" }, // CONFIRMAR
};

const current = () => (isCampaignN1() ? PHONES.n1 : PHONES.principal);

export const getDisplayPhone = () => current().display;
export const getPhoneLink = () => `tel:${current().tel}`;
