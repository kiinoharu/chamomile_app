import React, { useState } from 'react';
import Layout from '../components/Layout';


const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <Layout>
    <div style={{ backgroundColor: '#FFFFFF', padding: '20px' }}>
      <h2 style={{ color: '#FF69B4' }}>設定</h2>
      <div>
        <label style={{ color: '#FF69B4' }}>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
          />
          通知を有効にする
        </label>
      </div>
    </div>
    </Layout>
  );
};

export default SettingsPage;