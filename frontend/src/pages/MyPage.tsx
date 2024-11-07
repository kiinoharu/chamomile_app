import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const MyPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>マイページ</h2>
          <button 
            onClick={logout} 
            style={{
              padding: '10px',
              backgroundColor: '#FF69B4',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ログアウト
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;