import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const variants = {
  purple: 'bg-purple text-white',
  light: 'bg-white text-purple',
  dark: 'bg-dark text-white',
};

const sizes = {
  sm: 'px-5 py-1.5 text-xs',
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