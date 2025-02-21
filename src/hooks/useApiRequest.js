import axios from "axios"
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const useApiRequest = () => {
  const sendRequest = async ({ url, method = "GET", data = null, onSuccess, onError }) => {
    try {
      const res = await axios({
        url: `${backendUrl}${url}`,
        method,
        data
      })
      if (res.data.success) {
        toast.success(res.data.message)
        if (onSuccess) onSuccess(res.data);
      } else {
        toast.error(res.data.message || "Lỗi xảy ra, vui lòng thử lại")
      }
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message || "lỗi máy chủ")
      if (onError) onError(e)
    }
  }
  return { sendRequest }
}