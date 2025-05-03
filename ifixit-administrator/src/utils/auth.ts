// src/utils/auth.ts
export interface AuthData {
    // Por ejemplo:
    id: string;
    name: string;
    email: string;
  }
  
  export const setAuthData = (user: AuthData): void => {
    localStorage.setItem("employee", JSON.stringify(user));
  };
  
  export const getUser = (): AuthData | null => {
    const stored = localStorage.getItem("employee");
    return stored ? (JSON.parse(stored) as AuthData) : null;
  };
  
  export const clearAuthData = (): void => {
    localStorage.removeItem("employee");
  };
  