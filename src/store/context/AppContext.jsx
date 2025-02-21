import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [isLoggin, setIsLoggin] = useState("")
  const [userData, setUserData] = useState("")
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  axios.defaults.withCredentials = true

  // const getAuthState = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`)
  //     if (data.success) {
  //       setIsLoggin(true)
  //       getUserData()
        
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // useEffect(() => {
  //   getAuthState()
  // }, [])

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`)
      if (data.success) {
        setUserData(data.userData)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const values = {
    backendUrl,
    isLoggin, setIsLoggin,
    userData, setUserData,
    getUserData,
    // getAuthState
  }



  return (
    <AppContext.Provider value={values}>
      {props.children}
    </AppContext.Provider>
  )
}