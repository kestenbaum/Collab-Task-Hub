import React, { FC, FormHTMLAttributes } from 'react';

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({ children, ...rest }) => {
  return (
    <form {...rest} className={`flex flex-col gap-4 w-full ${rest.className || ''}`}>
      {children}
    </form>
  );
};
