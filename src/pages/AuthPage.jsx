import React from 'react'
import { assets } from '../assets/assets'
import LoginPage from './LoginPage'
import { Outlet, useNavigate } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import ResetPasswordPage from './ResetPasswordPage'

const AuthPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo}
        onClick={() => navigate("/")}
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        alt="" />
      <div>
      <Outlet></Outlet>
      </div>
    </div>
  )
}

export default AuthPage