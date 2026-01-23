import { useStoreAuth } from '@/features/auth/store/use-store-auth';

export const useAuth = () => {
  const { authError, registerUser, setAuthError, ...rest } = useStoreAuth();
  const clearAuthError = () => setAuthError(null);
  return { authError, registerUser, clearAuthError, ...rest };
};
