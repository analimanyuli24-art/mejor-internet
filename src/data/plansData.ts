import type { PlanCardData, PlanCategory } from '../types/content.types';

// PLANES: edita precios, textos y tabs aquí. Cada tab muestra su propia lista.
// Precios en formato "S/xx.xx" (se muestran con "/mes").

export interface PlanTab {
  id: PlanCategory;
  label: string;             // texto de la pastilla: INTERNET / INTERNET+TV / MÓVIL
  plans: PlanCardData[];
}

export const plansTabs: PlanTab[] = [
  {
    id: 'internet',
    label: 'INTERNET',
    plans: [
      {
        id: 'internet-mejor-precio',
        badge: '¡MEJOR PRECIO!',
        description: ['300 MBPS DE VELOCIDAD'],
        price: 'S/59.90',
        iconKey: 'icono-1',
      },
            {
        id: 'internet-mas-velocidad',
        badge: '¡MÁS VELOCIDAD!',
        oldGb: '200 GB',
        description: ['400 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['MESH - WIFI 360°'],
        price: 'S/69.00',
        iconKey: 'logo-internet',
      },
                  {
        id: 'internet-maxima-velocidad',
        badge: '¡MÁXIMA VELOCIDAD!',
        oldGb: '500 GB',
        description: ['1000 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['MESH - WIFI 360°'],
        price: 'S/79.00',
        iconKey: 'logo-internet',
        logos: ['logo-liga', 'logo-internet'],
      },
    ],
  },
  {
    id: 'internet-tv',
    label: 'INTERNET+TV',
    plans: [
      {
        id: 'tv-precio-top',
        badge: '¡PRECIO TOP!',
        description: ['600 MBPS DE VELOCIDAD.'],
        bullets: ['2 puntos de TV Digital', '100 canales incluidos'],
        price: 'S/79.90',
        iconKey: 'icono-2',
      },
            {
        id: 'tv-todo-en-uno',
        badge: '¡TODO EN UNO!',
        oldGb: '200 GB',
        description: ['400 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['105 canales HD', '2 decos incluidos'],
        price: 'S/94.00',
        iconKey: 'liga1max-universal-channels',
        logos: ['logo-liga'],
        channels: ['logo-disney', 'logo-espa', 'logo-sony', 'logo-warner'],
        compact: true,
      },
      {
        id: 'tv-mas-potencia',
        badge: '¡MÁS POTENCIA!',
        oldGb: '400 GB',
        description: ['1000 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['105 canales HD', '2 decos incluidos', 'MESH- WIFI 360°'],
        price: 'S/114.00',
        iconKey: 'liga1max-universal-mesh',
        logos: ['logo-liga'],
        channels: ['logo-disney', 'logo-espa', 'logo-sony', 'logo-warner'],
        devices: ['logo-internet'],
        compact: true,
      },
    ],
  },
  {
    id: 'movil',
    label: 'MÓVIL',
    plans: [
      {
        id: 'movil-mas-barata',
        badge: '¡LA MÁS BARATA!',
        description: ['INTERNET ILIMITADO', '125 GB DE ALTA VELOCIDAD'],
        bullets: ['Llamadas y SMS ilimitados'],
        price: 'S/27.90',
        iconKey: 'icono-3',
      },
            {
        id: 'movil-mas-completa',
        badge: '¡LA MÁS COMPLETA!',
        oldGb: '110 GB',
        description: ['INTERNET ILIMITADO', '200 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['Llamadas y SMS ilimitados', 'Roaming internacional'],
        price: 'S/34.95',
        iconKey: 'liga1max-universal',
        logos: ['logo-liga'],
      },
      {
        id: 'movil-mas-gb',
        badge: '¡MÁS GB!',
        oldGb: '155 GB',
        description: ['INTERNET ILIMITADO', '255 GB A ALTA VELOCIDAD', '(BONO PROMOCIONAL)'],
        bullets: ['Llamadas y SMS ilimitados', 'Roaming internacional'],
        price: 'S/47.95',
        iconKey: 'liga1max-universal',
        logos: ['logo-liga'],
      },
    ],
  },
];
