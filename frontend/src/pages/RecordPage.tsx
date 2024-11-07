import React, { useState } from 'react';
import Layout from '../components/Layout';


const RecordPage: React.FC = () => {
  const [record, setRecord] = useState('');

  return (
    <Layout>
    <div style={{ backgroundColor: '#FFFFFF', padding: '20px' }}>
      <h2 style={{ color: '#FF69B4' }}>記録画面</h2>
      <textarea 
        style={{ borderColor: '#FF69B4', width: '100%', height: '150px' }}
        value={record}
        onChange={(e) => setRecord(e.target.value)}
        placeholder="今日の記録を入力してください..."
      />
      <button style={{
        backgroundColor: '#FF69B4', 
        color: '#FFFFFF', 
        padding: '10px 20px', 
        border: 'none', 
        marginTop: '10px'
      }}>
        記録を保存
      </button>
    </div>
    </Layout>
  );
};

export default RecordPage;