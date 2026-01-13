import { WrapperProps } from '@/shared/types';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ExtendedWrapperProps extends WrapperProps {
  className?: string;
}

export const Wrapper = ({ children, className }: ExtendedWrapperProps) => {
  return (
    <div className={cn('border-default bg-white p-4 shadow-sm rounded-lg', className)}>
      {children}
    </div>
  );
};
