import type { ReactNode } from 'react';

import { WrapperProps } from '@/shared/types';

export const Wrapper = ({ children }: WrapperProps) => {
  return <div className="border-default bg-white p-4 shadow-sm">{children}</div>;
};
