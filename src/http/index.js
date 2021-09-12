import axios from 'axios';
import store from '../store';

const http = axios.create({
  baseURL: "http://localhost:3002",
  headers: { "content-type": "application/json" },
});

http.interceptors.request.use((config) => {
  const isAuth = store.getters["isAuth"];
  if (isAuth) {
    config.headers.common["Authorization"] = store.getters["getAccessToken"];
  }
  return config;
}, (error) => {
  console.error(error);
});

export default http;