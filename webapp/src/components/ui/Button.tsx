import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-primary/40',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover shadow-lg',
      outline: 'border-2 border-slate-200 bg-transparent hover:border-primary hover:text-primary',
      ghost: 'bg-transparent text-text-main hover:bg-slate-100',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
