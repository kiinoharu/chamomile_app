import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Axiosインスタンスをインポート

export interface User {
  id: number;
  username: string;
  cycle?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // ユーザー情報を保持
  login: (user: User) => void; 
  logout: () => void;
  guestLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // ユーザー情報をバックエンドから取得
  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/users/me'); // "me"エンドポイントから現在のユーザー情報を取得
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setIsAuthenticated(false);
    }
  };

  // 初期化時にユーザー情報を取得
  useEffect(() => {
    fetchUser();
  }, []);

  // ログイン処理
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ログアウト処理
  const logout = async () => {
    try {
      await apiClient.delete('/users/sign_out'); // ログアウトエンドポイントにリクエスト
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // ゲストログイン
  const guestLogin = () => {
    setUser({ id: 1, username: 'ゲスト', cycle: undefined }); // 仮のゲストデータをセット
    setIsAuthenticated(true);
    console.log('ゲストとしてログインしました');
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