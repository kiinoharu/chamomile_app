import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id?: number;
  username: string;
  cycle?: number; // 生理平均周期はオプショナル
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // ユーザー情報を保持
  login: (user: User) => void; // ログイン時にユーザー情報を設定
  logout: () => void;
  guestLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser({
      id: userData.id,
      username: userData.username,
      cycle: userData.cycle,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const guestLogin = () => {
    setUser({ id: 1, username: "ゲスト", cycle: undefined }); // ゲスト用データ
    setIsAuthenticated(true);
    console.log("ゲストとしてログインしました");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};