import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../store/context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/redux/slice/userSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggin } = useContext(AppContext)
  const user = useSelector((state) => state.user)
  const dispath = useDispatch()

  const handleLogout = async () => {
    try {
      const url = `${backendUrl}/api/auth/logout`
      const { data } = await axios.post(url)
      if (data.success) {
        setIsLoggin(false)
        toast.success(data.message)
        navigate("/")
        dispath(logoutUser())
        localStorage.clear()
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  // const handleSendVerifyOtp = async () => {
  //   axios.defaults.withCredentials = true
  //   try {
  //     const url = `${backendUrl}/api/auth/send-verify-otp`     
  //     const {data} = await axios.post(url)
  //     if(data.success) {
  //       navigate('/auth/email-verify')
  //       toast.success(data.message)
  //     } 
  //   } catch (error) {
  //     console.log(error.message)

  //   }
  // }


  return (
    <div className='flex items-center justify-between w-full p-4 sm:p-6 sm:px-24 fixed top-0 left-0 right-0'>
      <Link to={"/"}>
        <img src={assets.logo} className='w-28 sm:w-32' alt="" />
      </Link>
      {user.name ?
        <div className='w-8 h-8 flex items-center justify-center bg-black rounded-full text-white relative group'>
          {user.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 pt-10 capitalize right-0 rounded z-10 text-black '>
            <ul className='m-0 p-2 bg-gray-100 text-sm'>
              <li onClick={() => navigate("/profile")} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-12'>profile</li>
              <li onClick={handleLogout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-12'>logout</li>
            </ul>
          </div>
        </div>
        :
        <button
          onClick={() => navigate("/auth/login")}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
      text-gray-800 hover:bg-gray-100 transition-all'>login <img src={assets.arrow_icon} alt="" /></button>
      }
    </div>
  )
}

export default Navbar