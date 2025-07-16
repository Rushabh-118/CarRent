import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Features = () => {

    const navigate = useNavigate();
    const {cars} = useAppContext();

  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 '>
      <div>
        <Title title="Features" subtitle="Discover the amazing features of our car rental service" />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {cars.slice(0, 6).map((car) => (
                <div key={car._id}>
                    <CarCard car={car} />
                </div>
            ))}
      </div>
      <button onClick={() => navigate('/cars')} className='flex items-center justify-center gap-2 mt-18 px-6 py-2 border border-borderColor rounded-md cursor-pointer hover:bg-gray-100 transition-colors'>
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  )
}

export default Features
