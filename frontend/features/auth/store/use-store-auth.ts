import { create } from 'zustand';

import { authServices } from '@/features/auth/api/services/authServices';
import { AuthState } from '@/features/auth/types';
import { userServices } from '@/features/user/api/services/userServices';
import { UpdateUserDto } from '@/features/user/types';

export const useStoreAuth = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: false,
  authError: null,

  loginUser: async (credentials) => {
    set({ isLoading: true, authError: null });
    try {
      const { user, access_token } = await authServices.loginUser(credentials);

      localStorage.setItem('access_token', access_token);
      set({ user, isAuth: true, isLoading: false, authError: null });
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Invalid credentials'
          : 'Invalid credentials';
      set({ isLoading: false, authError: errorMessage });
      throw error;
    }
  },

  registerUser: async (data) => {
    set({ isLoading: true, authError: null });
    try {
      const { user, access_token } = await authServices.registerUser(data);

      localStorage.setItem('access_token', access_token);
      set({ user, isAuth: true, isLoading: false, authError: null });
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Registration failed'
          : 'Registration failed';
      set({ isLoading: false, authError: errorMessage });
      throw error;
    }
  },

  logoutUser: () => {
    localStorage.removeItem('access_token');
    set({ user: null, isAuth: false });
  },

  restoreUser: async () => {
    set({ isLoading: true });
    try {
      const user = await authServices.getCurrentUser();
      set({ user, isAuth: true, isLoading: false });
    } catch {
      set({ user: null, isAuth: false, isLoading: false });
      localStorage.removeItem('access_token');
    }
  },

  refreshUser: async () => {
    try {
      const user = await authServices.getCurrentUser();
      set({ user, isAuth: true });
    } catch (err) {
    }
  },

  updateUser: async (data: UpdateUserDto) => {
    set({ isLoading: true });
    try {
      const updatedUser = await userServices.updateProfile(data);
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
}));
