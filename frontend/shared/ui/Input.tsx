import { forwardRef } from 'react';
import { InputProps } from '@/shared/types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

        <input
          ref={ref}
          className={`
            px-3 py-2 rounded-md border transition-colors
            focus:outline-none focus:ring-2
            ${error ? 'border-red-500 ' : 'border-gray-300 '}
            ${className}
          `}
          {...props}
        />

        {error ? (
          <span className="text-xs text-red-500 mt-1">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-gray-500 mt-1">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
