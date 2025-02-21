import React, { useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { AppContext } from '../store/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from '../hooks/useApiRequest';

const EmailVerifyPage = () => {
  const [otp, setOtp] = useState('');
  const { backendUrl, getUserData, userData, isLoggin, } = useContext(AppContext)
  const navigate = useNavigate()
  const {sendRequest} = useApiRequest()


  const handleVerifyEmail = (e) => {
    e.preventDefault()
    sendRequest({
      url: "/api/auth/verify-account",
      method: "POST",
      data: {otp},
      onSuccess: () => {
        navigate("/auth/login")
      }
    })
  }


  useEffect(() => {
    isLoggin && userData && userData.isAccountVerify && navigate("/")
  }, [isLoggin, userData])

  return (
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
      <h2 className='text-3xl text-white font-semibold mb-3 text-center capitalize'>Email verify OTP</h2>
      <p className='text-sm text-center mb-6'>Enter the 6-digit code sent to your email to verify account!</p>
      <form onSubmit={handleVerifyEmail}>
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
        <input type="text" className='f' />
        <button type='submit' className='w-full py-3 rounded-full mt-6 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 hover:opacity-90 transition'>
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerifyPage;
