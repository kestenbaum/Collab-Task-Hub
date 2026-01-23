import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ExtendedWrapperProps } from '@/shared/types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Wrapper = ({ children, className }: ExtendedWrapperProps) => {
  return (
    <div className={cn('border-default bg-white p-4 shadow-sm rounded-lg', className)}>
      {children}
    </div>
  );
};
