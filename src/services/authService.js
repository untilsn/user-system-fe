import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL


export const loginUser = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/login`, data,
    { withCredentials: true })
  return res.data
}


export const registerUser = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/register`, data)
  return res.data
}


export const refreshToken = async () => {
  const res = await axios.post(`${backendUrl}/api/auth/refresh-token`, {},
    { withCredentials: true })
  return res.data
}

