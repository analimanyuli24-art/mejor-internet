import type { ReactNode } from 'react';

interface ImagePlaceholderProps {
  name: string;          
  className?: string;    
  children?: ReactNode;  
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
