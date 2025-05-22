import axios from 'axios';

const API_URL = 'http://localhost:3000/api/stock-in';

export const getStockIns = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStockInById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createStockIn = async (stockIn) => {
  const response = await axios.post(API_URL, stockIn);
  return response.data;
};

export const updateStockIn = async (id, stockIn) => {
  const response = await axios.put(`${API_URL}/${id}`, stockIn);
  return response.data;
};

export const deleteStockIn = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};