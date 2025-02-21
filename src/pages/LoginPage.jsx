import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import InputField from '../components/InputField'
import { MdOutlinePassword } from "react-icons/md"
import { CiMail } from "react-icons/ci"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../utils/validationSchema'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode"
import { updateUserDetails } from '../store/redux/slice/userSlice'
import { useMutationHook } from '../hooks/useMutation'
import { loginUser } from '../services/authService'
import MainButton from '../components/MainButton'
import { getDetailsUser } from '../services/userService'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  })

  const mutation = useMutationHook(loginUser)
  const { data, isSuccess, isPending } = mutation

  const handleLoginUser = (values) => {
    mutation.mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data.access_token) {
        localStorage.setItem("access_token", JSON.stringify(data.access_token))
        const decoded = jwtDecode(data.access_token)
        if (decoded.id) {
          handleGetDetailsUser(decoded.id, data.access_token)
        }
        navigate("/")
      }
    }
  }, [isSuccess, data])


  const handleGetDetailsUser = async (userId, token) => {
    try {
      const res = await getDetailsUser(userId, token)
      if (res.success) {
        dispatch(updateUserDetails({ ...res.userData }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
      <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>login account</h2>
      <p className=' text-sm text-center mb-6'>login your account</p>
      <form onSubmit={handleSubmit(handleLoginUser)} >
        <div className='flex flex-col items-center gap-4'>
          <InputField
            name="email"
            control={control}
            type='text'
            placeholder="enter your email"
            icon={<CiMail />}>
          </InputField>
          <InputField
            name="password"
            control={control}
            type='password'
            placeholder="enter your password"
            icon={<MdOutlinePassword />}>
          </InputField>
        </div>
        <Link to="/auth/reset-password" className='my-4 text-indigo-500  cursor-pointer block'>Forget password?</Link>
        <MainButton type='submit' isLoading={isPending}>Đăng nhập</MainButton>
        <p className='text-gray-400 text-center text-xs mt-4'>Don't have account? {" "}
          <Link to="/auth/register" className='text-blue-400 cursor-pointer underline'>Register here</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage