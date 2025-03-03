import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import ProductDesc from './ProductDesc'
import ProductGallery from './ProductGallery'
import Tiptap from '../../components/tiptap/Tiptap'

const ProductForm = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: 1,
      manufacturer: "",
      images: []
    },
    mode: "onSubmit"
  });

  return (
    <form className='w-full mt-20'>
      <h1 className='text-xl font-semibold mb-5'>CREATE PRODUCT</h1>

      {/* Product header */}
      <div className='rounded-3xl p-10 bg-white shadow-lg mb-10'>
        <div className='mb-5'>
          <label className='block mb-2'>Product Title</label>
          <input 
            type="text" 
            className='rounded-lg border border-gray-300 outline-none py-2 px-4 w-full' 
            {...register("title", { required: "Product title is required" })} 
            placeholder='Enter product title' 
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className='mb-5'>
          <label className='block mb-2'>Product Description</label>
          <Tiptap></Tiptap>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      {/* Gallery */}
      <div className='rounded-3xl p-10 bg-white shadow-lg'>
        <ProductGallery />
      </div>
    </form>
  );
}

export default ProductForm;
