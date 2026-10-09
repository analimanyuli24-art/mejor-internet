// Tipos de contenido de la página (datos en src/data/).

export type PlanCategory = 'internet' | 'internet-tv' | 'movil';

export interface PlanCardData {
  id: string;
  badge: string;             // ej. "¡LA MÁS BARATA!"
  description: string[];     // líneas de texto del plan
  bullets?: string[];        // lista con viñeta (llamadas, roaming, etc.)
  oldGb?: string;            // GB tachado (bono promocional)
  price: string;             // ej. "S/27.90"
  iconKey: string;           // clave del ícono/imagen en ImagePlaceholder
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AdvantageData {
  id: string;
  title: string;
  description: string;
  iconKey: string;
}
