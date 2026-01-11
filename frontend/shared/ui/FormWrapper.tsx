import React, { FC } from 'react';
import { FormWrapperProps } from '@/shared/types';

export const FormWrapper: FC<FormWrapperProps> = ({ children, ...rest }) => {
  return (
    <form {...rest} className={`flex flex-col gap-4 w-full ${rest.className || ''}`}>
      {children}
    </form>
  );
};
