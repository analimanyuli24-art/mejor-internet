# Mejor Internet - Landing de tarifas

Proyecto: React + Vite + TypeScript + Tailwind CSS v4.

## Dónde modificar cada parte

| Quiero cambiar... | Archivo |
|---|---|
| Colores | `src/styles/theme.css` (bloque `@theme`) |
| Fuente | `src/styles/theme.css` (`--font-sans`) |
| Barra superior (ticker) | `src/components/Header/TopTicker.tsx` y textos en `src/data/siteData.ts` |
| Logo del header | `src/components/Header/Header.tsx` |
| Hero (título, badges, imagen) | `src/components/Hero/` y textos en `src/data/siteData.ts` |
| Formulario del hero | `src/components/Hero/HeroLeadForm.tsx` |
| Texto introductorio | `src/components/Intro/Intro.tsx` y `src/data/siteData.ts` |
| Planes y precios (tabs) | `src/data/plansData.ts` |
| Tarjeta de un plan | `src/components/PlanSection/PlanCard.tsx` |
| Tabs de planes | `src/components/PlanSection/PlanTabs.tsx` |
| Ventajas | `src/data/advantagesData.ts` y `src/components/Advantages/` |
| Preguntas frecuentes | `src/data/faqData.ts` y `src/components/FAQ/` |
| Modal "¡Buena elección!" | `src/components/CallRequest/CallRequestModal.tsx` |
| Mensaje "Solicitud recibida" | `src/components/CallRequest/SuccessMessage.tsx` |
| **Envío de formularios a la base de datos de la empresa** | `src/services/leadService.ts` |
| Footer | `src/components/Footer/Footer.tsx` y `src/data/siteData.ts` |
| Orden de las secciones | `src/pages/HomePage.tsx` |

## Imágenes necesarias

Cada espacio de imagen usa `ImagePlaceholder` con el nombre del archivo esperado.
Busca `TODO: REEMPLAZAR` en el código para ubicarlos.

1. Logo principal (header) - `logo-mejor-internet`
2. Imagen de fondo del hero - `hero-image`
3. Logo del footer - `logo-footer`
4. Ícono/logo plan MÓVIL 1 - `5g`
5. Logo plan MÓVIL 2 y 3 - `liga1max-universal`
6. Ícono plan INTERNET 1 - `home-wifi`
7. Router plan INTERNET 2 - `mesh-router`
8. Router plan INTERNET 3 - `liga1max-universal`
9. Ícono plan INTERNET+TV 1 - `tv`
10. Logos plan INTERNET+TV 2 - `liga1max-universal-channels`
11. Logos plan INTERNET+TV 3 - `liga1max-universal-mesh`
12. Íconos de ventajas (4) - `home-wifi-outline`, `5g-outline`, `speedometer`, `piggy-bank`

## Pendientes

- Servicio de envío de formularios: `src/services/leadService.ts` (`LEAD_ENDPOINT` y formato).
- Destinos de los enlaces legales en `src/data/siteData.ts`.
- Regla de validación del número de teléfono (`isValidPhone`).
- Fuente tipográfica oficial (por ahora `DM Sans`, ver `theme.css`).
