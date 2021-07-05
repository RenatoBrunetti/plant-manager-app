import Constants from 'expo-constants';
import axios from 'axios';

const ip = Constants.manifest.extra?.api_ip;
const port = Constants.manifest.extra?.api_port;

const api = axios.create({
  baseURL: `http://${ip}:${port}`
});

export default api;
