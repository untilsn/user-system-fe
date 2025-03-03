import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EmailVerifyPage from './pages/EmailVerifyPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AuthPage from './pages/AuthPage'
import RegisterPage from './pages/RegisterPage'
import "react-toastify/dist/ReactToastify.css"
import CustomToastify from './components/toastify/CustomToastify'
import { useDispatch } from 'react-redux'
import { isJsonString } from './utils/utils'
import { jwtDecode } from 'jwt-decode'
import { updateUserDetails } from './store/redux/slice/userSlice'
import { getDetailsUser } from './services/userService'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import StorePage from './pages/StorePage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken && isJsonString(accessToken)) {
      const decoded = jwtDecode(JSON.parse(accessToken));
      if (decoded?.id) {
        handleGetDetailsUser(decoded.id, accessToken);
      }
    }
  }, []);
  
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
    <div>
      <CustomToastify></CustomToastify>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth/*' element={<AuthPage />}>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='register' element={<RegisterPage />}></Route>
          <Route path='email-verify' element={<EmailVerifyPage />}></Route>
          <Route path='reset-password' element={<ResetPasswordPage />}></Route>
        </Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/product' element={<StorePage/>}></Route>
        
      </Routes>
    </div>
  )
}

export default App