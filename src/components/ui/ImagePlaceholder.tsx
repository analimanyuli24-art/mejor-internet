import type { ReactNode } from 'react';

// ESPACIO PARA IMÁGENES Y LOGOS
// Reemplaza el contenido de este componente por <img> cuando tengas el archivo.
// Úsalo así:  <ImagePlaceholder name="hero-image" className="h-[400px] w-full" />
// La lista de imágenes pendientes está en README.md (sección "Imágenes necesarias").

interface ImagePlaceholderProps {
  name: string;          // nombre del archivo esperado, ej. "hero-image"
  className?: string;    // tamaño y proporción del diseño Figma
  children?: ReactNode;  // opcional: contenido que vaya dentro del espacio
}

function ImagePlaceholder({ name, className = '', children }: ImagePlaceholderProps) {
  // TODO: REEMPLAZAR POR LA IMAGEN ORIGINAL -> src/assets/images/ o src/assets/logos/ (archivo: {name})
  return (
    <div
      data-image={name}
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export default ImagePlaceholder;
