import axios from 'axios';

const API_URL = 'http://localhost:3000/api/reports';

export const getReport = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};