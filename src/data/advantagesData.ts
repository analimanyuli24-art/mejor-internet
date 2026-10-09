import type { AdvantageData } from '../types/content.types';

// VENTAJAS: los íconos se cambian en ui/ImagePlaceholder o en assets/icons/.
export const advantagesData: AdvantageData[] = [
  {
    id: 'instalacion-gratuita',
    title: 'Instalación Gratuita',
    description: 'La instalación de la fibra es rápida y totalmente gratuita',
    iconKey: 'home-wifi-outline',
  },
  {
    id: 'cobertura-5g',
    title: 'Cobertura 5G',
    description: 'Disfruta de mayor cobertura y máxima velocidad 5G',
    iconKey: '5g-outline',
  },
  {
    id: 'fibra-mas-rapida',
    title: 'La fibra más rápida',
    description: 'Tenemos la fibra más rápida según el barómetro de nPerf.',
    iconKey: 'speedometer',
  },
  {
    id: 'ahorro-garantizado',
    title: 'Ahorro garantizado',
    description: 'Promociones exclusivas para reducir tu factura de teléfono.',
    iconKey: 'piggy-bank',
  },
];
