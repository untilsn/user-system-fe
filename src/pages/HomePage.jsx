import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { jwtDecode } from 'jwt-decode'
import { Button } from '@material-tailwind/react'
import Tiptap from '../components/tiptap/Tiptap'

const HomePage = () => {
  return (
    <div className='bg-image'>
      <div className='container '>
        <Header></Header>
        <Tiptap></Tiptap>
      </div>
    </div>
  )
}

export default HomePage