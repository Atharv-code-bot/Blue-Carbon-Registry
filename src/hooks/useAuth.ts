import { create } from 'zustand';
import { AuthState, User } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: User['role']) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'community@blucarbon.org',
    name: 'Community Leader',
    role: 'community',
    organization: 'Village Green Initiative',
    location: 'Sundarbans, West Bengal',
    credits: 2450,
    tokens: 1200,
    level: 7,
    badges: [
      {
        id: '1',
        name: 'First Plantation',
        icon: '🌱',
        description: 'Completed your first mangrove plantation',
        earnedAt: '2024-01-15',
        rarity: 'common'
      },
      {
        id: '2',
        name: 'Verified Expert',
        icon: '✅',
        description: 'Had 10 plantations verified successfully',
        earnedAt: '2024-08-20',
        rarity: 'rare'
      }
    ],
    joinedAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'admin@nccr.gov.in',
    name: 'Dr. Priya Sharma',
    role: 'admin',
    organization: 'National Centre for Carbon Registry',
    location: 'New Delhi',
    credits: 0,
    tokens: 0,
    level: 1,
    badges: [],
    joinedAt: '2023-06-01'
  }
];

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('auth_user');
  },

  register: async (email: string, password: string, name: string, role: User['role']) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      credits: 0,
      tokens: 0,
      level: 1,
      badges: [],
      joinedAt: new Date().toISOString()
    };
    
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      set({ user: updatedUser });
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  }
}));

// Initialize auth state from localStorage
const storedUser = localStorage.getItem('auth_user');
if (storedUser) {
  try {
    const user = JSON.parse(storedUser);
    useAuth.setState({ user, isAuthenticated: true });
  } catch (error) {
    localStorage.removeItem('auth_user');
  }
}