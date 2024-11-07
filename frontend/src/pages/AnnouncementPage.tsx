import React, { useState } from 'react';
import Layout from '../components/Layout';

const AnnouncementPage: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);

  const announcements = [
    { 
      title: "子宮頸がん検診の頻度について", 
      content: "子宮頸がんは定期的な検診により早期発見が可能です。20歳以上の方は2年ごとに検診を受けることが推奨されており、異常が見つかった場合は早めの対応が可能です。詳細は以下の記事をご覧ください。",
      link: "https://naminamicl.jp/column/cervicalcanser/frequency-screening/#:~:text=2%E5%B9%B4%E9%96%93%E9%9A%94%E3%81%A7%E3%81%AE,%E7%99%BA%E8%A6%8B%E3%81%8C%E5%8F%AF%E8%83%BD%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82",
      date: new Date("2024-11-02")
    },
    { 
      title: "子宮頸がんの兆候", 
      content: "子宮頸がんの初期兆候には、おりものの増加、不正出血、生理周期以外の出血、生理の長期化などが挙げられます。こうした症状が続く場合は、早めに医療機関での検査を受けましょう。詳細は以下の記事をご覧ください。",
      link: "https://ganjoho.jp/public/cancer/cervix_uteri/about.html#:~:text=%E5%AD%90%E5%AE%AE%E9%A0%B8%E3%81%8C%E3%82%93%E3%81%8C,%E3%81%8C%E5%87%BA%E3%82%8B%E3%81%93%E3%81%A8%E3%82%82%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82",
      date: new Date("2024-11-02")
    },
    { 
      title: "婦人科系病気の兆候", 
      content: "婦人科系の病気には、おりものの異常、周期的な腹痛、不正出血などの症状があります。放置すると悪化する可能性があるため、異常を感じた際には医師の診察を受けましょう。詳しくは以下の記事をご参照ください。",
      link: "https://jihankai.jp/thc/obgyn/gynecology/gyn-general.php",
      date: new Date("2024-11-01")
    },
    { 
      title: "婦人科疾患に関する一般的な情報", 
      content: "女性の健康を守るためには、婦人科疾患の予防と早期発見が重要です。月経異常や下腹部の違和感など、婦人科系の症状にはさまざまなサインがあります。詳細な情報については以下の記事をご覧ください。",
      link: "https://www.aska-pharma.co.jp/mint/womanhealth/joseinobyoki/",
      date: new Date("2024-11-01")
    }
    // 他のアナウンスも同様の形式で追加
  ];

  const handleAnnouncementClick = (announcement: { title: string; content: string; link?: string }) => {
    setSelectedAnnouncement(announcement.title);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', width: '100%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF69B4' }}>⚠️重要⚠️<br/>アナウンス</h2>
          <ul style={{ textAlign: 'left', padding: '0', listStyleType: 'none', maxHeight: '400px', overflowY: 'auto' }}>
            {announcements.map((announcement, index) => (
              <li 
                key={index} 
                style={{ margin: '10px 0', padding: '15px', backgroundColor: '#ffffff', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', lineHeight: '1.5', cursor: 'pointer' }}
                onClick={() => handleAnnouncementClick(announcement)}
              >
                {announcement.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ポップアップでの詳細表示 */}
      {selectedAnnouncement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            maxWidth: '350px',
            width: '90%',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>{selectedAnnouncement}</h3>
            {announcements.find(a => a.title === selectedAnnouncement)?.content}
            <div style={{ marginTop: '20px' }}>
              {announcements.find(a => a.title === selectedAnnouncement)?.link && (
                <a href={announcements.find(a => a.title === selectedAnnouncement)?.link} target="_blank" rel="noopener noreferrer" style={{ color: '#FF69B4' }}>
                  詳細はこちら
                </a>
              )}
            </div>
            <button 
              onClick={() => setSelectedAnnouncement(null)} 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#999',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AnnouncementPage;