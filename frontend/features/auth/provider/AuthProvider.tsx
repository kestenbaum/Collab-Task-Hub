'use client';
import React, { useEffect } from 'react';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { AuthProviderProps } from '@/features/auth/types';
import { Loader } from '@/shared/ui';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { restoreUser, isLoading } = useStoreAuth();

  useEffect(() => {
    void restoreUser();
  }, [restoreUser]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
};

export default AuthProvider;
