import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export const api = async (method, url, data) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const headers = refreshToken
    ? {
        refreshToken: refreshToken,
      }
    : {};
  const response = await axios({ method, url, data, headers });
  return response;
};
