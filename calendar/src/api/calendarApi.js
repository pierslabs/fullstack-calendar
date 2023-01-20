import axios from 'axios';
import { getEnvVar } from '../helpers/getEnvVar';

const calendarAPi = axios.create({
  baseURL: getEnvVar().VITE_API_URL,
});

calendarAPi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});
export default calendarAPi;
