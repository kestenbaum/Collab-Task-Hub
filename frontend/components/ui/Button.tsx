import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', className, disabled, ...props }, ref) => {
    return (
      <button ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading && (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
