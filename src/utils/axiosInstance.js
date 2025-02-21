import axios from "axios";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/authService";

export const axiosJwt = axios.create()

let accessToken = localStorage.getItem("access_token");
let decodedToken = {};


if (accessToken && isJsonString(accessToken)) {
  accessToken = JSON.parse(accessToken);
  decodedToken = jwtDecode(accessToken);
}

const updateToken = async () => {
  try {
    const res = await refreshToken();
    if (res?.access_token) {
      localStorage.setItem("access_token", JSON.stringify(res.access_token));
      accessToken = res.access_token; // Cập nhật biến toàn cục
      decodedToken = jwtDecode(res.access_token);
      console.log("🔄 Token refreshed:", res.access_token);
    }
  } catch (error) {
    console.error("🚨 Refresh token failed:", error);
    localStorage.removeItem("access_token"); // Xóa token nếu refresh thất bại
    accessToken = null;
    decodedToken = {};
  }
};

axiosJwt.interceptors.request.use(
  async (config) => {
    const currentTime = new Date().getTime() / 1000;

    // Kiểm tra xem token có hết hạn không
    if (decodedToken?.exp && decodedToken.exp < currentTime) {
      console.warn("⚠️ Token expired! Refreshing...");
      await updateToken();
    }

    // Luôn đảm bảo request có Authorization header nếu token còn hợp lệ
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);