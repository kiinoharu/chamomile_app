import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { user: { username, password } }; 
    try {
      const response = await apiClient.post('/users/sign_in', userData);
      console.log(response.data);
      login(); // 認証状態を更新
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('ログインに失敗しました。');
    }
  };

  const handleGuestLogin = () => {
    guestLogin();
    navigate('/');
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>ログイン</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
            <input 
              type="text" 
              placeholder="ユーザー名" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: '10px',
                margin: '10px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }} 
            />
            <input 
              type="password" 
              placeholder="パスワード" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '10px',
                margin: '10px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }} 
            />
            <button 
              type="submit" 
              onClick={handleLogin}
              style={{
                padding: '10px',
                marginTop: '20px',
                backgroundColor: '#FF69B4',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ログイン
            </button>
          </form>

          {/* ゲストログインボタン */}
          <button 
            onClick={handleGuestLogin}
            style={{
              padding: '10px',
              marginTop: '20px',
              backgroundColor: '#6a1b9a',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
            }}
          >
            ゲストログイン
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
