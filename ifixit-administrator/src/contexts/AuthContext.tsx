import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import sessionstorage from 'sessionstorage';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;  // Añadir un estado para saber si está cargando
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carga

  useEffect(() => {
    // Verificar si hay un usuario guardado en sessionStorage
    const storedUser = sessionstorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Restaurar el usuario desde sessionStorage
      setIsAuthenticated(true);  // Marcar como autenticado
    }
    setLoading(false);  // Finalizar la carga después de verificar
  }, []);

  const login = (userData: any) => {
    setUser(userData);  // Guardar el objeto user en el estado
    sessionstorage.setItem('user', JSON.stringify(userData));  // Guardar el usuario en sessionStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionstorage.removeItem('user');  // Eliminar el usuario de sessionStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
