import AUTH_API from "./api/authApi";
import USER_API from "./api/userApi";
import DASHBOARD_API from "./api/dashboardApi";

const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://api.example.com",
  AUTH: AUTH_API,
  USER: USER_API,
  DASHBOARD: DASHBOARD_API,
};

export default API_CONFIG;