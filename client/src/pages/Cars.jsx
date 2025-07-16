import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Cars = () => {

  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext()
  const issearchdata = pickupLocation && pickupDate && returnDate

  const [input, setInput] = useState('');
  const [filtercars,setfiltercars] = useState([])

  const applyFilter = async() => {
    if(input === '') {
      setfiltercars(cars)
      return null;
    } 
    const filtered = cars.slice().filter((car)=> {
      return car.brand.toLowerCase().includes(input.toLowerCase()) ||
             car.model.toLowerCase().includes(input.toLowerCase()) ||
             car.category.toLowerCase().includes(input.toLowerCase()) ||
             car.transmission.toLowerCase().includes(input.toLowerCase()) 
    })
    setfiltercars(filtered)
  }
  const searchCarAvailability = async () => {
    const {data} = await axios.post('/api/booking/check-availability',{location: pickupLocation, pickupDate, returnDate})
    if(data.success) {
      setfiltercars(data.availableCars)
      if(data.availableCars.length === 0) toast('No cars Available')
      return null;
    }
  }
  useEffect(() => {
    issearchdata && searchCarAvailability()
  },[])
  useEffect(()=> {
    cars.length > 0 && !issearchdata && applyFilter()
  },[input, cars])

  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title="Available Cars" subtitle="Find the perfect car for your next adventure" />
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full rounded-full shadow h-12'>
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2' />
          <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search cars...' className='w-full outline-none h-full text-gray-500' />

          <img src={assets.filter_icon} alt="filter" className='w-4.5 h-4.5 ml-2' />
        </div>
      </div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-lg font-semibold text-gray-500 mx-auto xl:px-20'>Showing {filtercars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filtercars.map((car, index) => (
            <div key={index} className=' mb-20'>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars
