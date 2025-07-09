import React, { useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';

const AddCar = () => {

    const [image, setImage] = useState(null);
    const currency = import.meta.env.VITE_CURRENCY;
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        transmission: '',
        fuelType: '',
        seatingCapacity: 0,
        location: '',
        description: ''
    })

    const onsubmithandler = (e) => {
        e.preventDefault();
    }

  return (
    <div className='px-6 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subtitle="Fill in the details to add a new car to your fleet" align="left"/>
      <form onSubmit={onsubmithandler} className='flex flex-col gap-5 max-w-xl mt-6 text-gray-500 text-sm'>
        <div className='flex w-full items-center gap-2'>
            <label htmlFor="carimage">
                <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
                <input type="file" id='carimage' accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
            </label>
            <p className='text-sm text-gray-500'>Upload a car image</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full'>
                <label >Brand</label>
                <input type="text" placeholder="Give Brand Name" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.brand} onChange={e=> setCar({...car,brand: e.target.value})} required/>
            </div>
            <div className='flex flex-col w-full'>
                <label >Model</label>
                <input type="text" placeholder="Give Model Name" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.model} onChange={e=> setCar({...car,model: e.target.value})} required/>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='flex flex-col w-full'>
                <label >Year</label>
                <input type="number" placeholder="2025" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={e=> setCar({...car,year: e.target.value})} required/>
            </div>
            <div className='flex flex-col w-full'>
                <label >Price Per Day:- {currency} </label>
                <input type="number" placeholder="1000" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.pricePerDay} onChange={e=> setCar({...car,pricePerDay: e.target.value})} required/>
            </div>
            <div className='flex flex-col w-full'>
                <label >Category</label>
                <select>
                  
                </select>
                <input type="text" placeholder="Give Model Name" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.category} onChange={e=> setCar({...car,category: e.target.value})} required/>
            </div>
        </div>
      </form>
    </div>
  )
}

export default AddCar
