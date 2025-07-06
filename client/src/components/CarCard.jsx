import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
  return (
    <div onClick={() => {navigate(`/cars-details/${car._id}`); scrollTo(0, 0)}} className='border border-gray-300 p-4 rounded-md'>
      <div className='relative h-48 overflow-hidden'>
        <img src={car.image} alt='car Image' className='w-full h-48 object-cover rounded-md mb-4' />
        {car.isAvailable && <p className='absolute top-4 left-4 text-white px-2.5 py-1 rounded-full'>Available</p>}
        <div className='absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded-md'>
            <span>{currency}{car.pricePerDay} </span>
            <span className='text-xs'>/day</span>
        </div>
      </div>
      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
            <div>
                <h3 className='text-lg font-semibold'>{car.brand} {car.model}</h3>
                <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
            </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
            <div className='flex items-center text-sm text-muted-foreground'>
                <img src={assets.users_icon} alt="" className='mr-2 h-4'/>
                <span>{car.seating_capacity} Seats</span>
            </div>
            <div className='flex items-center text-sm text-muted-foreground'>
                <img src={assets.fuel_icon} alt="" className='mr-2 h-4'/>
                <span>{car.fuel_type}</span>
            </div>
            <div className='flex items-center text-sm text-muted-foreground'>
                <img src={assets.car_icon} alt="" className='mr-2 h-4'/>
                <span>{car.transmission}</span>
            </div>
            <div className='flex items-center text-sm text-muted-foreground'>
                <img src={assets.location_icon} alt="" className='mr-2 h-4'/>
                <span>{car.location}</span>
            </div>
        </div>

      </div>
    </div>
  )
}

export default CarCard
