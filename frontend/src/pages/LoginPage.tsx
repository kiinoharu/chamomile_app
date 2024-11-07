import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    alert('ログインしました');
  };

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>ログイン</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
            <input 
              type="text" 
              placeholder="ユーザー名" 
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
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;