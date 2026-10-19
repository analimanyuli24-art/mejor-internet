const PARAM = 'T-source';
const STORAGE_KEY = 'mi_tsource';

const readFromUrl = (): string | null => {
  try {
    return new URLSearchParams(window.location.search).get(PARAM);
  } catch {
    return null;
  }
};

// Guarda el origen al entrar a la página, por si la URL cambia después.
export const captureTrafficSource = (): void => {
  const fromUrl = readFromUrl();
  if (!fromUrl) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, fromUrl);
  } catch {
    // Si el navegador bloquea el almacenamiento, se usa solo la URL.
  }
};

// Devuelve el origen de la campaña, o null si el visitante llegó de forma orgánica.
export const getTrafficSource = (): string | null => {
  const fromUrl = readFromUrl();
  if (fromUrl) return fromUrl;
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

captureTrafficSource();