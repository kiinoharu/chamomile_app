import React, { useState } from 'react';
import Layout from '../components/Layout';
import apiClient from '../api/apiClient';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cycle, setCycle] = useState<number | ''>(''); // 生理平均周期

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
   // データをAPIに送信
   const userData = { user: { username, password, cycle } };
   console.log('User data:', userData); 
   try {
     const response = await apiClient.post('http://localhost:3001/users', userData );
     console.log('User registered:', response.data);
     alert('ユーザー登録が完了しました');
   } catch (error) {
     console.error('Error during sign-up:', error);
     alert('登録に失敗しました。再度お試しください。');
   }
 };

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>ユーザー登録</h2>
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
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
            <input 
              type="number" 
              placeholder="ご自身の生理平均周期 (日)" 
              value={cycle}
              onChange={(e) => setCycle(Number(e.target.value))}
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
              登録
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;