import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { fetchUser, updateUserCycle } from '../api/users';

const MyPage: React.FC = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<{ id: number; username: string; cycle: number } | null>(null);
  const [newCycle, setNewCycle] = useState<number | null>(null);

  // ユーザー情報の取得
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = 1; // 仮のユーザーID。AuthContextなどから取得する場合はここを変更。
        const userData = await fetchUser(userId);
        setUser(userData);
        setNewCycle(userData.cycle); // 生理周期の初期値を設定
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    loadUser();
  }, []);

  // 生理周期の更新
  const handleCycleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newCycle !== null) {
      try {
        const response = await updateUserCycle(user.id, newCycle);
        alert(response.message);
        setUser({ ...user, cycle: newCycle }); // 更新後のデータを反映
      } catch (error) {
        console.error('Failed to update cycle:', error);
        alert('生理周期の更新に失敗しました。');
      }
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>マイページ</h2>

          {user ? (
            <>
              <p>ユーザー名: {user.username}</p>
              <p>生理周期: {user.cycle}日</p>
              <form onSubmit={handleCycleUpdate} style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  生理周期（日数）を編集:
                  <input
                    type="number"
                    value={newCycle || ''}
                    onChange={(e) => setNewCycle(Number(e.target.value))}
                    style={{
                      marginTop: '5px',
                      padding: '8px',
                      width: '100%',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </label>
                <button
                  type="submit"
                  style={{
                    padding: '10px',
                    backgroundColor: '#FF69B4',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  更新する
                </button>
              </form>
            </>
          ) : (
            <p>ユーザー情報を読み込んでいます...</p>
          )}

          <button
            onClick={logout}
            style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#FF69B4',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
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
