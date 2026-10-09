import type { ButtonHTMLAttributes, ReactNode } from 'react';

// BOTONES DEL SITIO
// variant "purple": "Saber más", "Llamanos", "Solicitar llamada"
// variant "dark":   "Solicitar más información" (FAQ)
// size "md": normal · "lg": hero · "xl": botón "Saber más" de las tarjetas
// Ambos crecen un poco al pasar el mouse y se hunden al hacer clic.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'dark';
  size?: 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const variants = {
  purple: 'bg-purple text-white',
  dark: 'bg-dark text-white',
};

const sizes = {
  md: 'px-5 py-2 text-sm',
  lg: 'px-10 py-3 text-lg',
  xl: 'px-16 py-2 text-2xl',
};

function Button({ variant = 'purple', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full font-semibold transition duration-200 hover:scale-105 hover:brightness-110 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;