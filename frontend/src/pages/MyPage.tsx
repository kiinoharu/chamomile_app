import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import apiClient from '../api/apiClient'; // Axiosインスタンス

const MyPage: React.FC = () => {
  const { user, logout } = useAuth(); // ユーザー情報を取得
  const [cycle, setCycle] = useState<number | ''>(user?.cycle || ''); // 生理周期を管理
  const [isEditing, setIsEditing] = useState(false); // 編集モードの管理

  const handleSave = async () => {
    try {
      console.log('User in AuthContext:', user);
      // APIリクエストで生理周期を更新
      const response = await apiClient.put(`/users/${user?.id}`, { cycle }); // ユーザーIDを指定
      console.log('Updated cycle:', response.data);
      alert('生理周期を更新しました');
      setIsEditing(false); // 編集モードを終了
    } catch (error) {
      console.error('Failed to update cycle:', error);
      alert('生理周期の更新に失敗しました');
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>マイページ</h2>
          <p style={{ marginBottom: '10px', fontSize: '1rem' }}>
            <strong>ユーザー名:</strong> {user?.username || '不明'}
          </p>
          <div style={{ marginBottom: '20px', fontSize: '1rem' }}>
            <strong>生理平均周期:</strong>
            {isEditing ? (
              <input 
                type="number" 
                value={cycle} 
                onChange={(e) => setCycle(Number(e.target.value))} 
                style={{
                  padding: '5px',
                  marginLeft: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }}
              />
            ) : (
              <span style={{ marginLeft: '10px' }}>{cycle ? `${cycle} 日` : '未設定'}</span>
            )}
          </div>
          {isEditing ? (
            <button
              onClick={handleSave}
              style={{
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                marginRight: '10px'
              }}
            >
              保存
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '10px',
                backgroundColor: '#FF69B4',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                marginRight: '10px'
              }}
            >
              編集
            </button>
          )}
          <button 
            onClick={logout} 
            style={{
              padding: '10px',
              backgroundColor: '#FF4500',
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
