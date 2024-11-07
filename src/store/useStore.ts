import { create } from 'zustand';
import { UserState } from '../types';

export const useStore = create<UserState>((set) => ({
  coins: 100,
  theme: 'light',
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  removeCoins: (amount) => set((state) => ({ coins: state.coins - amount })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));