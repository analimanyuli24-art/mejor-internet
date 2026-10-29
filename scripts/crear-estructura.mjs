import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const C = { reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', dim: '\x1b[2m' };

// Archivo -> responsabilidad (se escribe como comentario en archivos nuevos)
const estructura = [
  ['src/styles/theme.css', 'Paleta, fuente y animaciones'],
  ['src/types/content.types.ts', 'Tipos de planes, FAQ y ventajas'],
  ['src/types/lead.types.ts', 'Tipos de formularios'],
  ['src/data/plansData.ts', 'Tabs y planes con precios'],
  ['src/data/faqData.ts', 'Preguntas y respuestas'],
  ['src/data/advantagesData.ts', 'Ventajas'],
  ['src/data/siteData.ts', 'Textos generales: ticker, hero, intro, footer'],
  ['src/services/leadService.ts', 'Envío de formularios a la empresa'],
  ['src/components/ui/Button.tsx', 'Botones del sitio'],
  ['src/components/ui/ImagePlaceholder.tsx', 'Espacio para imágenes y logos'],
  ['src/components/Header/Header.tsx', 'Encabezado con logo'],
  ['src/components/Header/TopTicker.tsx', 'Barra de oferta en bucle'],
  ['src/components/Hero/Hero.tsx', 'Sección inicial'],
  ['src/components/Hero/PriceBadge.tsx', 'Burbujas de precio'],
  ['src/components/Hero/HeroLeadForm.tsx', 'Formulario "No esperes en línea"'],
  ['src/components/Intro/Intro.tsx', 'Texto introductorio'],
  ['src/components/PlanSection/PlanSection.tsx', 'Sección "Elige tu próximo plan"'],
  ['src/components/PlanSection/PlanTabs.tsx', 'Tabs de planes'],
  ['src/components/PlanSection/PlanCard.tsx', 'Tarjeta de un plan'],
  ['src/components/Advantages/Advantages.tsx', 'Sección de ventajas'],
  ['src/components/Advantages/AdvantageItem.tsx', 'Una ventaja'],
  ['src/components/FAQ/FAQ.tsx', 'Sección de preguntas'],
  ['src/components/FAQ/FAQItem.tsx', 'Una pregunta desplegable'],
  ['src/components/CallRequest/CallRequestContext.tsx', 'Control global del modal'],
  ['src/components/CallRequest/CallRequestModal.tsx', 'Modal "¡Buena elección!"'],
  ['src/components/CallRequest/SuccessMessage.tsx', 'Mensaje "Solicitud recibida"'],
  ['src/components/Footer/Footer.tsx', 'Pie de página'],
  ['src/pages/HomePage.tsx', 'Une las secciones en orden'],
  ['src/App.tsx', 'Proveedores globales'],
  ['src/main.tsx', 'Punto de entrada'],
];

let creados = 0;
console.log(`\n${C.cyan}mejor-internet${C.reset}`);

for (const [ruta, descripcion] of estructura) {
  const existe = existsSync(ruta);
  if (!existe) {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, `// ${descripcion}\n`);
    creados++;
  }
  const marca = existe ? `${C.dim}✔ existe ${C.reset}` : `${C.green}＋ creado ${C.reset}`;
  const nombre = ruta.split('/').pop();
  const carpeta = ruta.split('/').slice(0, -1).join('/');
  console.log(`  ${C.yellow}${carpeta}/${C.reset}  ${marca} ${nombre}  ${C.dim}— ${descripcion}${C.reset}`);
}

console.log(`\n${creados > 0 ? C.green : C.dim}${creados} archivo(s) nuevo(s).${C.reset}\n`);
