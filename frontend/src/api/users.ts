import axios from 'axios';

// ユーザー情報を取得するAPI
export const fetchUser = async (userId: number) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

// ユーザー情報（周期）を更新するAPI
export const updateUserCycle = async (userId: number, cycle: number) => {
  const response = await axios.put(`/users/${userId}`, { cycle });
  return response.data;
};
