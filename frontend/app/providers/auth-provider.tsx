'use client';

import React, { useEffect } from 'react';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useStoreAuth((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
