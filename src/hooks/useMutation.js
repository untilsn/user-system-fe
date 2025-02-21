import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"


export const useMutationHook = (fcCallback) => {
  const mutation = useMutation({
    mutationFn: fcCallback,
    onSuccess: (data) => {
      toast.success(data?.message || "Thành công!");
    },
    onError: (e) => { 
      const errorMessage = e?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error(errorMessage);
    }
  })
  return mutation
}