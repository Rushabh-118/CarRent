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
                <select onChange={e=> setCar({...car,category: e.target.value})} value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                  <option value="">select a Category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                </select>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
                <label >Transmission</label>
                <select onChange={e=> setCar({...car,transmission: e.target.value})} value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                  <option value="">select a Transmission</option>
                  <option value="Autometic">Autometic</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Autometic">Semi-Autometic</option>
                </select>
          </div>
          <div className='flex flex-col w-full'>
                <label >Fuel_Type</label>
                <select onChange={e=> setCar({...car,fuelType: e.target.value})} value={car.fuelType} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                  <option value="">select a Fuel_Type</option>
                  <option value="Gas">Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label >Seating capacity</label>
                <input type="number" placeholder="5" className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seatingCapacity} onChange={e=> setCar({...car,seatingCapacity: e.target.value})} required/>
            </div>
        </div>
        <div className='flex flex-col w-full'>
          <label >Location</label>
          <select onChange={e=> setCar({...car,location: e.target.value})} value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                  <option value="">select a Location</option>
                  <option value="Nadiad">Nadiad</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Bharuch">Bharuch</option>
                  <option value="Ahemdabad">Ahemdabad</option>
                  <option value="Surat">Surat</option>
                </select>
        </div>
        <div className='flex flex-col w-full'>
                <label >Description</label>
                <textarea rows={5} placeholder="Write About Car.." className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={e=> setCar({...car,description: e.target.value})} required>
                </textarea>
        </div>
        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'> 
          <img src={assets.tick_icon} alt="" />
          Add Car
        </button>
      </form>
    </div>
  )
}

export default AddCar
