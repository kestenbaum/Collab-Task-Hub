import { create } from 'zustand';
import { authServices } from '@/features/auth/api/services/authServices';
import { AuthState } from '@/features/auth/types';

export const useStoreAuth = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: false,

  loginUser: async (credentials) => {
    set({ isLoading: true });
    const { user, access_token } = await authServices.loginUser(credentials);

    localStorage.setItem('access_token', access_token);
    set({ user, isAuth: true, isLoading: false });
  },

  registerUser: async (data) => {
    set({ isLoading: true });
    const { user, access_token } = await authServices.registerUser(data);

    localStorage.setItem('access_token', access_token);
    set({ user, isAuth: true, isLoading: false });
  },

  logoutUser: () => {
    localStorage.removeItem('access_token');
    set({ user: null, isAuth: false });
  },
}));
