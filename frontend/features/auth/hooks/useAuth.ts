import { useStoreAuth } from '@/features/auth/store/use-store-auth';

export const useAuth = () => {
  const { isAuth, checkAuth, user, logout, login, isLoading } = useStoreAuth();

  return { isAuth, checkAuth, user, logout, login, isLoading };
};
