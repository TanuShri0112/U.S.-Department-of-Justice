import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAuthStore } from "@/store/auth";
import { Role } from "@/types/platform";

interface AuthContextValue {
  user: ReturnType<typeof useAuthStore>["user"];
  loading: boolean;
  error?: string;
  login: (email: string, role: Role) => Promise<void>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading, error, login, logout, switchRole } = useAuthStore();

  const value = useMemo(
    () => ({ user, loading, error, login, logout, switchRole }),
    [user, loading, error, login, logout, switchRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
};

