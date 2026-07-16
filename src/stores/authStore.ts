import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_CREDENTIALS } from '@/constants/config';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; email: string } | null;
  login: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: (username: string, email: string, password: string) => {
        const { username: storedUsername, email: storedEmail, password: storedPassword } = AUTH_CREDENTIALS;
        if (
          username === storedUsername &&
          email === storedEmail &&
          password === storedPassword
        ) {
          set({ isAuthenticated: true, user: { username, email } });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    { name: 'auth-storage' }
  )
);