import { create } from "zustand";
import { Role, User } from "@/types/platform";
import { mockApi } from "@/utils/mockApi";

interface AuthState {
  user: User | null;
  loading: boolean;
  error?: string;
  login: (email: string, role: Role) => Promise<void>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  async login(email, role) {
    set({ loading: true, error: undefined });
    const { data, error } = await mockApi.getCurrentUser(role);
    if (error || !data) {
      set({ error: error ?? "Unable to login", loading: false });
      return;
    }
    set({ user: { ...data, email }, loading: false });
  },
  logout() {
    set({ user: null });
  },
  switchRole(role) {
    set((state) => (state.user ? { user: { ...state.user, role } } : state));
  },
}));

