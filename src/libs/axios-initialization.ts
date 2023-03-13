import axios from 'axios';

export const axiosMain = axios.create({
  baseURL: '/api/json',
});
