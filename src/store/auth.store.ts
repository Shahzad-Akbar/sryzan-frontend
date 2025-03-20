import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/lib/api/services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, accessToken, refreshToken } = await authService.login(email, password);
          set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user, accessToken, refreshToken } = await authService.register(data);
          set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          accessToken: null, 
          refreshToken: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(
            refreshToken
          );
          set({ accessToken, refreshToken: newRefreshToken });
        } catch (error) {
          get().logout();
          throw error;
        }
      },

      resendVerificationEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resendVerificationEmail(email);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to resend verification email',
            isLoading: false 
          });
          throw error;
        }
      },

      verifyEmail: async (token) => {
        set({ isLoading: true, error: null });
        try {
          await authService.verifyEmail(token);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to verify email',
            isLoading: false 
          });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await authService.forgotPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to send reset email',
            isLoading: false 
          });
          throw error;
        }
      },

      resetPassword: async (token, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resetPassword(token, newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to reset password',
            isLoading: false 
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);