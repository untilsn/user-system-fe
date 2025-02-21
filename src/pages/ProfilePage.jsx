import { Avatar, Spinner } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateDetailsUser, uploadAvatarUser } from "../services/userService";
import { updateUserDetails } from "../store/redux/slice/userSlice";
import { toast } from "react-toastify";
import { useMutationHook } from "../hooks/useMutation";

export default function ProfilePage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("")
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  console.log(user)


  const { control, setValue , handleSubmit} = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
      setAvatar(user.avatar)
    }
  }, [user, setValue]);


  const handleUploadAvatar = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) return

      setLoadingAvatar(true)

      const formData = new FormData()
      formData.append("avatar", file)

      const res = await uploadAvatarUser(formData, user.id)
      console.log(res)
      if (res.success && res.avatar) {
        dispatch(updateUserDetails({ avatar: res.avatar }))
        toast.success(res.message)
        setAvatar(res.avatar);
      }
    } catch (error) {
      toast.error("Upload failed!");
      console.log(error)
    } finally {
      setLoadingAvatar(false);
    }
  }


  const mutation = useMutationHook((data) => updateDetailsUser(data, user?.id))
  const {data, isSuccess, isLoading} = mutation
  console.log(data)

  const handleUpdateDetails =  async(values) => {
   mutation.mutate(values)
  }


  return (
    <div className="bg-image">
      <div className="container">
        <div className="flex min-h-screen w-full py-20">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white p-6 shadow-lg rounded-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 mb-4">
                <Avatar
                  src={avatar || "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                  alt="User Avatar"
                  className="w-full h-full border-4 border-white"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full shadow-md">
                  <label htmlFor="upload">
                    {loadingAvatar ? <Spinner className="w-5 h-5 text-white" /> : <FaCamera size={18} className="text-white" />}
                  </label>
                  <input onChange={handleUploadAvatar} className="hidden" type="file" id="upload" />
                </div>
              </div>
              <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
              <p className="text-gray-500">CEO of Apple</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  Opportunities applied:{" "}
                  <span className="text-orange-500 font-bold">32</span>
                </p>
                <p className="text-sm">
                  Opportunities won:{" "}
                  <span className="text-green-500 font-bold">26</span>
                </p>
                <p className="text-sm">
                  Current opportunities: <span className="font-bold">6</span>
                </p>
              </div>
              <Button type="submit" className="mt-4 w-full">View Public Profile</Button>
            </div>
          </aside>

          {/* User Details Form */}
          <main className="flex-1 p-6">
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="text-lg font-semibold pb-2">
                Account Settings
              </h3>
              <form onSubmit={handleSubmit(handleUpdateDetails)} className="mt-4 grid grid-cols-2 gap-10">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label="First Name" variant="standard" />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label="Email address" variant="standard" />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label="Phone number" variant="standard" />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label="Address" variant="standard" />
                  )}
                />
                <Button type="submit" loading={isLoading} className="mt-4 w-full max-w-36">Update</Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
