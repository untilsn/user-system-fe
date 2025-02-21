import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { jwtDecode } from 'jwt-decode'
import { Button } from '@material-tailwind/react'

const HomePage = () => {
  return (
    <div className='bg-image'>
      <div className='container '>
        <Header></Header>
      </div>
    </div>
  )
}

export default HomePage