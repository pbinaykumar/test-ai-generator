export type ImageSize = 'youtube' | 'instagram' | 'twitter' | 'custom';

export interface UserState {
  coins: number;
  theme: 'dark' | 'light';
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  toggleTheme: () => void;
}

export interface GenerationResult {
  id: string;
  url: string;
  prompt: string;
  type: 'image' | 'video';
  size?: ImageSize;
  createdAt: Date;
}