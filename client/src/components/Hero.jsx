import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('');

    const {navigate, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext();

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/cars?pickupLocation='+ pickupLocation+ '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100 text-center gap-14'>
      <h1 className='text-5xl font-bold'>Welcome to Car Rental</h1>
        <form onSubmit={handleSearch} className='flex flex-col md:items-center items-start md:flex-row justify-between p-6 rounded-2xl bg-white shadow-lg w-full md:max-w-3xl'>
            <div className='flex flex-col md:flex-row gap-10 items-start md:items-center min-md:ml-8'>
                <div className='flex flex-col gap-2 items-start'>
                    <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                        <option value="">Pickup Location</option>
                        {cityList.map((city) => (
                            <option value={city} key={city}>{city}</option>
                        ))}
                    </select>
                    <p className='text-sm text-gray-500'>{pickupLocation ? pickupLocation : 'Please select a pickup location'}</p>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="pickupDate">Pickup Date</label>
                    <input value={pickupDate} onChange={e => setPickupDate(e.target.value)} type="date" id="pickupDate" min={new Date().toISOString().split("T")[0]} className='border border-gray-300 p-2 rounded-md' required/>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="returnDate">Return Date</label>
                    <input value={returnDate} onChange={e => setReturnDate(e.target.value)} type="date" id="returnDate" min={new Date().toISOString().split("T")[0]} className='border border-gray-300 p-2 rounded-md' required/>
                </div>
                <button>
                    <img src={assets.search_icon} alt="search" className='inline-block mr-2' />
                    Search
                </button>
            </div>
        </form>
        <img src={assets.main_car} alt="car" className='max-h-74'/>
    </div>
  )
}

export default Hero
