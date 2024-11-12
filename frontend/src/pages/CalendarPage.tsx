import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import helpIcon from '../images/help_icon.png';
import axios, { AxiosError } from 'axios';

const CalendarPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); 
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isPeriodStart, setIsPeriodStart] = useState<boolean>(false);
  const [isPeriodEnd, setIsPeriodEnd] = useState<boolean>(false);
  const [isDischarge, setIsDischarge] = useState<boolean>(false);
  const [isSpotting, setIsSpotting] = useState<boolean>(false);
  const [isTakingPill, setIsTakingPill] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [isYearMonthDropdownOpen, setIsYearMonthDropdownOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [records, setRecords] = useState<{ [key: string]: any }>({});
  const [showPeriodIcon, setShowPeriodIcon] = useState<boolean>(false); 

  const announcements = [
    {
      title: "子宮頸がん検診の頻度について",
      content: "定期的な検診が早期発見につながります。20歳以上の方は2年ごとに検診を受けることが推奨されます。",
      link: "https://naminamicl.jp/column/cervicalcanser/frequency-screening/",
      date: new Date("2024-11-02")
    },
    {
      title: "子宮頸がんの兆候",
      content: "おりものの増加、不正出血、生理周期以外の出血などが見られたら医療機関での検査をお勧めします。",
      link: "https://ganjoho.jp/public/cancer/cervix_uteri/about.html",
      date: new Date("2024-11-02")
    },
  ];

  const latestAnnouncements = announcements
  .sort((a, b) => b.date.getTime() - a.date.getTime()) 
  .slice(0, 2); 

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<null | { title: string; content: string; link: string }>(null);

  const handleAnnouncementClick = (announcement: { title: string; content: string; link: string }) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  // 曜日の配列
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 月の最初の曜日と日数を計算
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  useEffect(() => {
    if (isPeriodStart && !isPeriodEnd) {
      setShowPeriodIcon(true);
    } else {
      setShowPeriodIcon(false);
    }
  }, [isPeriodStart, isPeriodEnd]);

  useEffect(() => {
    if (isPeriodEnd) {
      setIsPeriodStart(false);
    }
  }, [isPeriodEnd]);

  // 選択された日付が特定の条件（連続する日付が7日以上）を満たすかチェック
  useEffect(() => {
    console.log("fetchRecordsを実行");
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/records');
        console.log("取得したデータ:", response.data);
        const fetchedRecords = response.data.reduce((acc: any, record: any) => {
          acc[record.record_date] = record;
          return acc;
        }, {});
        setRecords(fetchedRecords);
        console.log("records state 更新:", fetchedRecords);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, [month, year]);

  useEffect(() => {
    console.log("レンダリングチェック:", records); // recordsが更新されるたびにログが表示されるか確認
  }, [records]);

  // 日付をクリックしたときの処理
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const dateKey = `${year}-${month}-${day}`;
    const record = records[dateKey];

    setTemperature(record?.temperature ?? '');
    setWeight(record?.weight ?? '');
    setNote(record?.note ?? '');
    setIsPeriodStart(record?.is_period_start ?? false);
    setIsPeriodEnd(record?.is_period_end ?? false);
    setIsDischarge(record?.is_discharge ?? false);
    setIsSpotting(record?.is_spotting ?? false);
    setIsTakingPill(record?.is_taking_pill ?? false);
  };

  // ボタンの制御ロジック
  const isPeriodStartDisabled = isPeriodEnd || Object.values(records).some(
    (record: any) => record.is_period_start
  );
  const isPeriodEndDisabled = !isPeriodStart || isPeriodEnd || !Object.values(records).some(
    (record: any) => record.is_period_start
  );

    // 連続日数のチェック用に選択した日を保存
  //   setSelectedDates((prevDates) => {
  //     if (!prevDates.includes(day)) return [...prevDates, day];
  //     return prevDates;
  //   });
  // };
  
  // 年と月の変更処理
  const handleYearMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
    setIsYearMonthDropdownOpen(false);
  };

  const handleHelpClick = () => {
    setShowHelpPopup(true);
  };

  const handleCloseHelpPopup = () => {
    setShowHelpPopup(false);
  };

  // 記録を保存する処理

  const handleSaveRecord = async () => {
    if (!selectedDay) return;
  
    // ユーザーIDを取得
    const userId = isAuthenticated ? 1 : null;
    if (!userId) {
      console.error("ユーザーIDが設定されていません");
      return;
    }
  
    const recordDate = `${year}-${month}-${selectedDay}`;
    const recordData = {
      record: {
        user_id: userId,
        record_date: recordDate,
        temperature: temperature ? parseFloat(temperature) : null,
        weight: weight ? parseFloat(weight) : null,
        note: note,
        is_period_start: isPeriodStart,
        is_period_end: isPeriodEnd,
        is_discharge: isDischarge,
        is_spotting: isSpotting,
        is_taking_pill: isTakingPill,
      },
    };
  
    try {
      // まずは同じ日付の記録があるかどうか確認
      const response = await axios.get(`http://localhost:3001/api/v1/records?record_date=${recordDate}&user_id=${userId}`);
  
      if (response.data && response.data.id) {
        // 記録がある場合は更新
        await axios.put(`http://localhost:3001/api/v1/records/${response.data.id}`, recordData);
      } else {
        // 記録がない場合は新規作成
        await axios.post('http://localhost:3001/api/v1/records', recordData);
      }
  
      // 保存完了後、記録を更新
      setRecords((prevRecords) => ({
        ...prevRecords,
        [recordDate]: recordData.record,
      }));
  
      // 選択された日付を解除してフォームを閉じる
      setSelectedDay(null);
    } catch (error) {
      const axiosError = error as AxiosError; // error を AxiosError 型にキャスト
      if (axiosError.response && axiosError.response.status === 404) {
        await axios.post('http://localhost:3001/api/v1/records', recordData);
      } else {
        console.error('Error saving record:', axiosError.response?.data || axiosError.message);
        alert('記録の保存に失敗しました');
        return;
      }
    }
    navigate('/');
  };
  
  // 🌙マークを生理期間中に表示する処理
  const getPeriodIcon = (day: number) => {
    const dateKey = `${year}-${month}-${day}`;
    const record = records[dateKey];
    console.log(`チェック対象の日付: ${dateKey}`, record); // 日付とそのデータをログ出力

    // 開始・終了日そのものに🌙を表示
    if (record && (record.is_period_start || record.is_period_end)) {
        console.log(`🌙マーク表示: 開始・終了日 ${dateKey}`);
        return '🌙';
    }

    // 開始日と終了日の間の日付に🌙を表示
    const startDates = Object.keys(records)
        .filter((key) => records[key].is_period_start)
        .sort();
    const endDates = Object.keys(records)
        .filter((key) => records[key].is_period_end)
        .sort();

    console.log("開始日一覧:", startDates, "終了日一覧:", endDates); // 開始・終了日のリストを出力

    if (startDates.length > 0) {
        const lastStart = startDates[startDates.length - 1];
        const lastEnd = endDates.find((end) => end > lastStart) || null;

        console.log(`最後の開始日: ${lastStart}`, lastEnd ? `最後の終了日: ${lastEnd}` : "終了日なし");

        // 開始日以降で終了日が存在しない場合、記録のある日付にのみ🌙を表示
        if (lastEnd === null) {
            if (lastStart < dateKey && record) {
                console.log(`🌙マーク表示: 開始日以降の記録日 ${dateKey}`);
                return '🌙';
            }
        } else {
            // 開始日から終了日までの期間に🌙を表示
            if (lastStart < dateKey && dateKey < lastEnd) {
                console.log(`🌙マーク表示: 期間内 ${dateKey}`);
                return '🌙';
            }
        }
    }

    return null;
};

  
  

const toggleIsPeriodEnd = () => {
  setIsPeriodEnd((prev) => !prev);
  if (!isPeriodEnd) {
    setIsPeriodStart(false);
  }
};


  // // 生理開始日が設定されているかチェックし、開始ボタンの表示を制御
  // const isPeriodStartDisabled = !isPeriodEnd && Object.values(records).some(
  //   (record: any) => record.is_period_start
  // );
  

  return (
    <Layout>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
        <h1 
          style={{ color: '#FF69B4', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => setIsYearMonthDropdownOpen(!isYearMonthDropdownOpen)}
        >
          {year}年 {month}月
        </h1>
        
        {/* 年と月選択のドロップダウン */}
        {isYearMonthDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            zIndex: 1000
          }}>
            <div>
              <h3 style={{ color: '#FF69B4' }}>年を選択</h3>
              {Array.from({ length: 5 }, (_, i) => year - 2 + i).map((y) => (
                <div
                  key={y}
                  onClick={() => handleYearMonthChange(y, month)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: y === year ? '#FFEBE8' : '#fff',
                    color: y === year ? '#FF69B4' : '#000',
                  }}
                >
                  {y}年
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color: '#FF69B4' }}>月を選択</h3>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <div
                  key={m}
                  onClick={() => handleYearMonthChange(year, m)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: m === month ? '#FFEBE8' : '#fff',
                    color: m === month ? '#FF69B4' : '#000',
                  }}
                >
                  {m}月
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 曜日表示 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '5px',
          textAlign: 'center',
          marginTop: '10px',
          fontWeight: 'bold',
          color: '#666'
        }}>
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* カレンダーの日付表示 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '5px',
          marginTop: '5px'
        }}>
          {/* 空白のセルを追加して、月の最初の日の位置を調整 */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateKey = `${year}-${month}-${day}`;
            const record = records[dateKey];
            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                style={{
                  border: '1px solid #ddd',
                  backgroundColor: '#ffffff',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {day}
                {/* 🌙マーク表示（開始後終了までの間） */}
                {record && (
                  <div style={{ fontSize: '0.8em', color: '#555' }}>
                    {record.is_discharge && '💧'}
                    {record.is_spotting && '🩸'}
                    {record.is_taking_pill && '💊'}
                    {getPeriodIcon(day)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 記録入力フォーム */}
        {selectedDay !== null && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            width: '90%',
            maxWidth: '340px',
            zIndex: 1000
          }}>
            <h2 style={{ color: '#FF69B4', textAlign: 'center' }}>{month}月 {selectedDay}日の記録</h2>
            <img 
                src={helpIcon}
                alt="ヘルプ"
                onClick={handleHelpClick}
                style={{
                  cursor: 'pointer',
                  width: '60px',
                  height: '60px',
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                }}
              />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label>
                <span style={{ color: '#555' }}>体温</span>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  style={{
                    width: '80px',
                    padding: '5px',
                    margin: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  placeholder="°C"
                />
              </label>

              <label>
                <span style={{ color: '#555' }}>体重</span>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{
                    width: '80px',
                    padding: '5px',
                    margin: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  placeholder="kg"
                />
              </label>
            </div>

            {/* ボタンの配置（開始・終了・おりもの・不正出血） */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => setIsDischarge(!isDischarge)}
                  style={{
                    backgroundColor: isDischarge ? '#FF69B4' : '#ddd',
                    color: isDischarge ? '#FFFFFF' : '#555',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '14px',
                  }}
                >
                  💧
                </button>
                <button
                  onClick={() => setIsSpotting(!isSpotting)}
                  style={{
                    backgroundColor: isSpotting ? '#FF69B4' : '#ddd',
                    color: isSpotting ? '#FFFFFF' : '#555',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  🩸
                </button>
              </div>
              <button
                  onClick={() => setIsTakingPill(!isTakingPill)}
                  style={{
                    backgroundColor: isTakingPill ? '#FF69B4' : '#ddd',
                    color: isTakingPill ? '#FFFFFF' : '#555',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '60px'
                  }}
                >
                  💊
                </button>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🌙</span>
              <button
                onClick={() => setIsPeriodStart(!isPeriodStart)}
                disabled={isPeriodEnd}
                style={{
                  backgroundColor: isPeriodStart ? '#FF69B4' : '#ddd',
                  color: isPeriodStart ? '#FFFFFF' : '#555',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                開始
              </button>

              <button
                onClick={() => setIsPeriodEnd(!isPeriodEnd)}
                style={{
                  backgroundColor: isPeriodEnd ? '#FF69B4' : '#ddd',
                  color: isPeriodEnd ? '#FFFFFF' : '#555',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                終了
              </button>
            </div>

            <label style={{ display: 'block', marginBottom: '10px' }}>
              <span style={{ color: '#555' }}>メモ</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  width: '100%',
                  height: '60px',
                  padding: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="メモを入力"
              />
            </label>

            <button
              onClick={handleSaveRecord}
              style={{
                backgroundColor: '#FF69B4',
                color: '#FFFFFF',
                padding: '10px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              保存
            </button>

            <button
              onClick={() => setSelectedDay(null)}
              style={{
                backgroundColor: '#ddd',
                color: '#555',
                padding: '10px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
          </div>
        )}

        {/* ヘルプのポップアップ */}
        {showHelpPopup && (
          <div 
          onClick={() => setShowHelpPopup(false)} 
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              maxWidth: '300px',
              maxHeight: '500px',
              width: '90%',
              overflowY: 'auto', 
              borderRadius: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
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
          </div>
        )}

        {/* 背景の暗いオーバーレイ */}
        {selectedDay !== null && (
          <div
            onClick={() => setSelectedDay(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
          />
        )}
        {/* 使い方ページへのリンクを追加 */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/usageguide" style={{ color: '#FF69B4', textDecoration: 'none', fontWeight: 'bold' }}>
            ※使い方
          </Link>
        </div>

        {/* 最新アナウンスの表示 */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3 style={{ color: '#FF69B4' }}>最新のお知らせ</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {latestAnnouncements.map((announcement, index) => (
              <li 
                key={index} 
                style={{ margin: '10px 0', padding: '10px', backgroundColor: '#ffffff', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <h4 style={{ color: '#FF69B4' }}>{announcement.title}</h4>
                <a href="#" style={{ color: '#FF69B4', textDecoration: 'none' }}>詳細はこちら</a>
              </li>
            ))}
          </ul>
        </div>

        {/* モーダルポップアップ */}
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
            onClick={handleCloseModal}
          >
            <div 
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                maxWidth: '350px',
                width: '90%',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()} // モーダル外をクリックして閉じる
            >
              <h3 style={{ color: '#FF69B4', marginBottom: '10px' }}>{selectedAnnouncement.title}</h3>
              <p>{selectedAnnouncement.content}</p>
              <a href={selectedAnnouncement.link} target="_blank" rel="noopener noreferrer" style={{ color: '#FF69B4' }}>
                詳細はこちら
              </a>
              <button 
                onClick={handleCloseModal} 
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
        </div>
    </Layout>
  );
};

export default CalendarPage;