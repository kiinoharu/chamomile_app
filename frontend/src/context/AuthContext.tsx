import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (id: number) => void;
  logout: () => void;
  guestLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null); // ユーザーIDを管理

  const login = (id: number) => {
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  const guestLogin = () => {
    setIsAuthenticated(true);
    setUserId(1); // ゲスト用のユーザーID
    console.log("ゲストとしてログインしました");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
