import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const signUp = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email });
  return response.data;
};

export const login = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email });
    return response.data;
  } catch (error) {
    console.error('API Login Error:', error);
    throw error;
  }
};

export const getUserData = (token) =>
  axios.get(`${API_BASE_URL}/characters/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllUsers = (token) =>
  axios.get(`${API_BASE_URL}/characters/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateUserRole = (id, role, token) =>
  axios.put(
    `${API_BASE_URL}/roles/update`,
    { id, role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
