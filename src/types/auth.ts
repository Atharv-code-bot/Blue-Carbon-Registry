export interface User {
  id: string;
  email: string;
  name: string;
  role: 'community' | 'ngo' | 'panchayat' | 'admin';
  organization?: string;
  location?: string;
  avatar?: string;
  credits: number;
  tokens: number;
  level: number;
  badges: Badge[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}