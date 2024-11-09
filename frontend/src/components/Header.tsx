import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import '../styles.css';


const Header: React.FC = () => {
  const { isAuthenticated } = useAuth(); // 認証状態の確認
  const [menuOpen, setMenuOpen] = useState(false);

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header style={{ backgroundColor: '#FF69B4', padding: '10px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem' }}>
          <Link to="/" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Chamomile</Link>
        </h1>

        {/* ログインと新規登録リンク（未ログイン時のみ表示） */}
        {!isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
            <Link to="/login" style={{ color: '#FFFFFF', fontSize: '0.8rem', marginRight: '5px' }}>
              ログイン
            </Link>
            <Link to="/signup" style={{ color: '#FFFFFF', fontSize: '0.8rem', marginRight: '5px' }}>
              新規登録
            </Link>
          </div>
        )}

        {/* メニューボタン */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>
      
      {/* メニューリンク（メニューが開いているときだけ表示） */}
      {menuOpen && (
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>ホーム</Link>
          {/* <Link to="/record" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>記録</Link>
          <Link to="/statistics" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>統計</Link> */}
          <Link to="/announcement" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>掲示板</Link>
          <Link to="/settings" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>設定</Link>
          <Link to="/usageguide" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>使い方</Link>
          {/* マイページリンク（ログイン時のみ表示） */}
          {isAuthenticated && (
            <Link to="/mypage" style={{ display: 'block', margin: '10px 5px', color: '#FFFFFF' }} onClick={toggleMenu}>マイページ</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
