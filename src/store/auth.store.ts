import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, User } from '@/types/store';
import { authService } from '@/lib/api/services/auth.service';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setTokens: (accessToken: string | null, refreshToken: string | null) => set({ accessToken, refreshToken }),
      setError: (error: string | null) => set({ error }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);
          set({ 
            user: response.user, 
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          set({ 
            user: response.user, 
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false 
          });
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.verifyEmail(token);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to verify email', 
            isLoading: false 
          });
        }
      },

      resendVerificationEmail: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resendVerificationEmail(email);
          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to resend verification email', 
            isLoading: false 
          });
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.forgotPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to send reset email',
            isLoading: false
          });
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resetPassword(token, newPassword);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to reset password',
            isLoading: false
          });
        }
      },

      refreshAccessToken: async () => {
        try {
          const refreshToken = useAuthStore.getState().refreshToken;
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
          const response = await authService.refreshToken(refreshToken);
          set({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to refresh token',
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null
          });
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
    }),
    {
      name: 'auth-storage',
    }
  )
);