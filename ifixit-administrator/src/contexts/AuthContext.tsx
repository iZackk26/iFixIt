// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface AuthData {
  id: string;
  name: string;
  email: string;
  // …otros campos que necesites…
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthData | null;
  login: (userData: AuthData) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const parsed: AuthData = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        sessionStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: AuthData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
