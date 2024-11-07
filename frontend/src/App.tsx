import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CalendarPage from './pages/CalendarPage';
import RecordPage from './pages/RecordPage';
import StatisticsPage from './pages/StatisticsPage';
import AnnouncementPage from './pages/AnnouncementPage';
import SettingsPage from './pages/SettingsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import UsageGuide from './pages/UsageGuide';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/usageguide" element={<UsageGuide />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;