import { Input } from '@material-tailwind/react'
import React from 'react'
import ProductForm from '../modules/product/ProductForm'

const StorePage = () => {
  return (
    <div className='bg-image'>
      <div className='container'>
        <ProductForm></ProductForm>
      </div>
    </div>
  )
}

export default StorePage