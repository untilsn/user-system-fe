import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import InputField from '../components/InputField'
import { CiMail, CiUser } from "react-icons/ci"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from '../utils/validationSchema'
import { CiLock } from "react-icons/ci"
import MainButton from '../components/MainButton'
import { useMutationHook } from '../hooks/useMutation'
import { registerUser } from '../services/authService'

const RegisterPage = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  })

  const mutation = useMutationHook(registerUser)
  const { isSuccess, isPending } = mutation

  const handleRegisterUser = async (values) => {
    mutation.mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/email-verify")
    }
  }, [isSuccess, navigate])


  return (
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
      <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>create account</h2>
      <p className=' text-sm text-center mb-6'>create your account</p>
      <form onSubmit={handleSubmit(handleRegisterUser)} >
        <div className='flex flex-col items-center gap-5'>
          <InputField
            name="name"
            control={control}
            type='text'
            placeholder="enter your name"
            icon={<CiUser />}>
          </InputField>
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
            icon={<CiLock />}>
          </InputField>
          <InputField
            name="confirmPassword"
            control={control}
            type='password'
            placeholder="confirm your password"
            icon={<CiLock />}>
          </InputField>
        </div>
        <Link to="/auth/reset-password" className='my-4 text-indigo-500  cursor-pointer block'>Forget password?</Link>
        <MainButton type='submit' isLoading={isPending}> Đăng ký</MainButton>
        <p className='text-gray-400 text-center text-xs mt-4'>Already have account? {" "}
          <Link to="/auth/login" className='text-blue-400 cursor-pointer underline'>Login here</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage