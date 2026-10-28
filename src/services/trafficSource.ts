const PARAM = "T-source";
const STORAGE_KEY = "mi_tsource";

// Única definición de la campaña n1 en todo el proyecto
export const CAMPAIGN_N1 = "camp_n1";

const normalize = (value: string | null): string | null => {
  const v = value?.trim().toLowerCase();
  return v === CAMPAIGN_N1 ? v : null;
};

const readFromUrl = (): string | null => {
  try {
    return normalize(new URLSearchParams(window.location.search).get(PARAM));
  } catch {
    return null;
  }
};

const readFromStorage = (): string | null => {
  try {
    return normalize(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const writeStorage = (value: string | null): void => {
  try {
    if (value) sessionStorage.setItem(STORAGE_KEY, value);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Almacenamiento bloqueado: se usa solo la memoria.
  }
};

// Se calcula una vez al cargar la página:
// - URL con el parámetro: manda la URL y se guarda.
// - Raíz "/" sin parámetro: es la landing principal, se descarta lo guardado.
// - Otra ruta sin parámetro (ej. /terminos): se conserva lo guardado.
const resolveSource = (): string | null => {
  const fromUrl = readFromUrl();
  if (fromUrl) {
    writeStorage(fromUrl);
    return fromUrl;
  }
  if (window.location.pathname === "/") {
    writeStorage(null);
    return null;
  }
  return readFromStorage();
};

const currentSource: string | null = resolveSource();

export const getTrafficSource = (): string | null => currentSource;
export const isCampaignN1 = (): boolean => currentSource === CAMPAIGN_N1;
