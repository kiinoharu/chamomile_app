import React from 'react';
import Layout from '../components/Layout';

const UsageGuide: React.FC = () => {
  return (
    <Layout>
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#FF69B4', textAlign: 'center' }}>Chamomileとは？</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Chamomileは、生理周期や体調の変化を簡単に管理できるアプリです。<br/>
          日々の体温や体重、生理の状態を記録することで、体調の傾向を把握しやすくし、健康管理に役立てることを目的としています。<br/>
          このアプリを活用し、カモミールのようなリラックスした心持ちで、自分自身の体調や生理周期を穏やかに管理することを目指しています。
        </p>

        <h2 style={{ color: '#FF69B4', textAlign: 'center' }}>記録の仕方</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          この項目では、体温や体重、生理の記録を入力する方法について説明します。以下の項目に従って、日々の体調管理に役立ててください。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>1. 体温入力</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          体温の入力欄に測定した体温を入力してください。単位は°Cです。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>2. 体重入力</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          体重の入力欄に現在の体重を入力してください。単位はkgです。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>3. おりものボタン 💧</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          このボタンを押すことで、おりものの状態を記録できます。色がついている場合は「あり」、色がついていない場合は「なし」を意味します。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>4. 不正出血ボタン 🩸</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          不正出血の有無を記録するためのボタンです。色がついている場合は「あり」、色がついていない場合は「なし」を示します。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>5. 薬ボタン 💊</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          ピルや他の薬の服用を記録するためのボタンです。服用状況を記録することで、通院時に医師へ服用歴を正確に伝えるのに役立ちます。色がついている場合は「服用あり」、色がついていない場合は「服用なし」を示します。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>6. 生理開始・終了ボタン 🌙</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          「開始」ボタンを押すことで生理開始日を、「終了」ボタンを押すことで生理終了日を記録できます。一度にどちらか片方しか選択できません。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>7. メモ</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          体調や気分、その他の詳細を自由にメモとして入力できます。日々の体調の変化を記録するのに役立ちます。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>8. 保存ボタン</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          入力が完了したら「保存」ボタンを押してください。入力した内容は該当日に保存され、日付を選択することで確認・修正できます。
        </p>

        <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>9. キャンセルボタン</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          入力をキャンセルする場合は「キャンセル」ボタンを押してください。入力内容は保存されません。
        </p>
      </div>
    </Layout>
  );
};

export default UsageGuide;