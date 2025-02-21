import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import { IoMdMail } from "react-icons/io";
import OtpInput from 'react-otp-input';
import { FaLock } from "react-icons/fa";
import { AppContext } from '../store/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import MainButton from '../components/MainButton';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onSubmit"
  })


  const handleSendEmail = async (values) => {
    try {
      setIsLoading(true)
      const url = `${backendUrl}/api/auth/send-reset-otp`
      const { data } = await axios.post(url, { email: values.email })
      if (data.success) {
        toast.success(data.message)
        setIsEmailSent(true)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong, please try again!");
    } finally {
      setIsLoading(false)
    }
  }


  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error("please enter your OTP send to your email")
    } else {
      setIsOtpSubmited(true)
    }
  }

  const handleResetPassword = async (values) => {
    try {
      const url = `${backendUrl}/api/auth/reset-password`
      const {data} = await axios.post(url, {
        email: values.email,
        otp,
        newPassword: values.password
      })

      if (data.success) {
        toast.success(data.message)
        navigate("/auth/login")
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  } 

  return (
    <div>
      {/* email reset password */}
      {!isEmailSent &&
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
          <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>Reset password</h2>
          <p className='text-sm text-center mb-6'>Enter your email address</p>
          <form onSubmit={handleSubmit(handleSendEmail)}>
            <InputField control={control} name="email" type='email' placeholder="Email Id" icon={<IoMdMail />}></InputField>
            <MainButton type='submit' isLoading={isLoading}>Reset password email</MainButton>
          </form>
        </div>
      }
      {/* input otp reset password */}
      {!isOtpSubmited && isEmailSent &&
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
          <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>Reset password</h2>
          <p className='text-sm text-center mb-6'>Enter the 6-digit code sent to your email</p>
          <form onSubmit={handleSendOtp}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              containerStyle="flex justify-center w-full gap-2 "
              numInputs={6}
              inputStyle={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.375rem',
                backgroundColor: '#333A4C',
                color: 'white',
                fontSize: '1.25rem',
                textAlign: 'center',
                // border: '1px solid #6366f1', 
                outline: 'none',
                focusStyle: "#6366f1",
                transition: 'all 0.3s ease-in-out',
              }}
              focusStyle={{
                border: '2px solid #6366F1',
                boxShadow: '0 0 8px #6366F1',
              }}
              renderInput={(props) => <input {...props} />}
            />
            <button type='submit' className='w-full py-3 rounded-full mt-6 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 hover:opacity-90 transition'>
              submit
            </button>
          </form>
        </div>
      }
      {/* new password */}
      {isOtpSubmited && isEmailSent &&
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
          <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>New password</h2>
          <p className='text-sm text-center mb-6'>Enter the new password below</p>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <InputField control={control} name="password" type='password' placeholder="New password" icon={<FaLock />}></InputField>
            <button type='submit' className='w-full py-3 rounded-full mt-6 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 hover:opacity-90 transition'>
              Submit
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default ResetPasswordPage