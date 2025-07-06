import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col items-center justify-between md:flex-row px-8 min-md:pl-14 pt-10 bg-gradient-to-r
        from-blue-600 to-blue-200 max-w-7xl md:mx-auto rounded-2xl overflow-hidden mx-3'>
      <div className='text-white'>
        <h1 className='text-3xl font-semibold'>Welcome to Car Rental</h1>
        <p className=' mt-2'>
          Discover the best cars for rent at affordable prices. Your journey starts here!
        </p>
        <p className=' max-w-130'>
          Explore our wide range of vehicles and find the perfect one for your needs.
        </p>
        <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>List Your Car</button>
      </div>
      <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>
    </div>
  )
}

export default Banner
