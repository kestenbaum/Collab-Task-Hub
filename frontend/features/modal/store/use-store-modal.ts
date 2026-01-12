import { create } from 'zustand';

import { ModalState } from '../types';

export const useStoreModal = create<ModalState>((set) => ({
  isOpen: false,
  content: null,

  open: (content) => {
    set({ content: null}, false);
    set({ isOpen: true, content })
  },
  close: () => set({ isOpen: false, content: null }),
}));
