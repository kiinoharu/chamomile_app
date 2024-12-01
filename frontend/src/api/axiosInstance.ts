import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1',
  withCredentials: true, // クッキー情報を送信
});

// レスポンスエラーの共通処理
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 認証エラーの場合
      alert('ログインが必要です。ログイン画面に移動します。');
      window.location.href = '/login'; // ログイン画面にリダイレクト
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
