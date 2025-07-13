import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const {currency, axios ,user} = useAppContext();
  const fetchBookings = async () => {
    try {
      const {data} = await axios.get('/api/booking/user')
      if(data.success) {
        setBookings(data.bookings)
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    user && fetchBookings();
  }, [user])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40 mt-16 text-sm max-w-7xl'>
      <Title title="My Bookings" subtitle="Manage your bookings and view details" align="left"/>
      <div>
        {bookings.map((booking, index) => (
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 border border-gray-300 p-4 rounded-md mb-4'>
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car.image} alt={booking.car.brand} className='w-full h-auto object-cover aspect-video' />
              </div>
              <p className='text-lg font-medium mt-2'>{booking.car.brand}  {booking.car.model}</p>
              <p className='text-gray-600'>{booking.car.year} | {booking.car.category} | {booking.car.location}</p>
            </div>
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded'>Bookings #{index+1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{booking.status}</p>
              </div>
              <div className='items-start flex gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-gray-600'>Rental Period</p>
                  <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>
              <div className='items-start flex gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-gray-600'>Pick-up Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>
              <div className='md:col-span-1 flex flex-col justify-between gap-6'>
                <div className=' text-sm text-gray-500 text-right'>
                  <p>Total Amount</p>
                  <h1 className='text-2xl font-semibold text-primary'>{currency}{booking.price}</h1>
                  <p>Booked on {booking.createdAt.split('T')[0]}</p>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
