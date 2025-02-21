import axios from "axios"
import { axiosJwt } from "../utils/axiosInstance"


const backendUrl = import.meta.env.VITE_BACKEND_URL



export const getDetailsUser = async (userId, token) => {
  const res = await axiosJwt.get(`${backendUrl}/api/user/get-details/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export const uploadAvatarUser = async (formData, userId) => {
  const res = await axiosJwt.put(`${backendUrl}/api/user/upload-avatar/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }
  )
  return res.data
}

export const updateDetailsUser = async (data, userId) => {
  const res = await axiosJwt.put(`${backendUrl}/api/user/update-details/${userId}`,
    data
  )
  return res.data
}
