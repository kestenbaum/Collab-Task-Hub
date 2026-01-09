import { create } from 'zustand';
import { authServices } from '@/features/auth/api/services/authServices';
import { AuthState } from '@/features/auth/types';

export const useStoreAuth = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  login: async (credentials) => {
    set({ isLoading: true });
    const { user, token } = await authServices.loginUser(credentials);
    localStorage.setItem('access_token', token);
    set({ user, isAuth: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, isAuth: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ user: null, isAuth: false, isLoading: false });
      return;
    }

    try {
      const user = await authServices.fetchCurrentUser();
      set({ user, isAuth: true, isLoading: false });
    } catch {
      localStorage.removeItem('access_token');
      set({ user: null, isAuth: false, isLoading: false });
    }
  },
}));
