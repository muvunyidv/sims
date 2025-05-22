import axios from 'axios';

const API_URL = 'http://localhost:3000/api/stock-out';

export const getStockOuts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStockOutById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createStockOut = async (stockOut) => {
  const response = await axios.post(API_URL, stockOut);
  return response.data;
};

export const updateStockOut = async (id, stockOut) => {
  const response = await axios.put(`${API_URL}/${id}`, stockOut);
  return response.data;
};

export const deleteStockOut = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};