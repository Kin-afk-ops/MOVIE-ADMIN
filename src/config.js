import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const TOKEN = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Linh ${TOKEN}` },
});
export default axiosInstance;
