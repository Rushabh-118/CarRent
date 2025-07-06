import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCarData } from '../assets/assets';

const CarDetails = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    setCar(dummyCarData.find(car => car._id === id))
  }, [id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer '>
        <img src={assets.arrow_icon} alt=""  className='rotate-180 opacity-55'/>
        Back to all cars</button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          <div className='lg:col-span-2'>
            <img src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md'/>
            <div className='space-y-6'>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              
            </div>
          </div>
          <form ></form>
        </div>
    </div>
  ) : <p>Loading....</p>
}

export default CarDetails
