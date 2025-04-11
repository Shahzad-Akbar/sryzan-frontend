import { create } from 'zustand';
import { UIStore } from '@/types/store';

export const useUIStore = create<UIStore>((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: false,
  isLoading: false,
  activeModal: null,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },

  setLeftSidebarOpen: (open) => set({ leftSidebarOpen: open }),
  setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),

  showModal: (modalId) => set({ activeModal: modalId }),
  hideModal: () => set({ activeModal: null }),

  showToast: (message, type) =>
    set({
      toast: {
        message,
        type,
        isVisible: true,
      },
    }),

  hideToast: () =>
    set({
      toast: {
        message: '',
        type: 'info',
        isVisible: false,
      },
    }),
}));
