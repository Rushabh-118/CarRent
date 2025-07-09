import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {

    const user = dummyUserData;
    const location = useLocation();
    const [image, setImage] = useState('');
    const updateImage = async () => {
        user.image = URL.createObjectURL(image);
        setImage('');
    }

  return (
    <aside className='relative min-h-screen flex flex-col items-center pt-10 md:w-64 w-full text-sm border-r border-borderColor bg-gradient-to-b from-white to-gray-50 shadow-lg'>
      <div className='group relative flex flex-col items-center mb-6'>
        <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
            <img src={image ? URL.createObjectURL(image) : user?.image || "https://tse1.explicit.bing.net/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?rs=1&pid=ImgDetMain&o=7&rm=3"} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg mb-2 transition-all duration-300 hover:scale-105" />
            <input type="file" id='image' accept='image/*' onChange={(e) => setImage(e.target.files[0])} className="hidden" />
            <div className='absolute bottom-0 right-0 left-0 top-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity'>
                <img src={assets.edit_icon} alt="Edit" className="w-7 h-7" />
            </div>
        </label>
      </div>
      {image && (
        <button onClick={updateImage} className='absolute top-6 right-6 flex p-2 gap-1 cursor-pointer bg-primary/10 text-primary rounded-md shadow-md hover:bg-primary/20 transition'>Save <img src={assets.check_icon} width={15} alt="Save" /></button>
      )}
      <p className='mt-2 text-lg font-bold max-md:hidden text-center tracking-wide'>{user?.name}</p>
      <nav className='w-full mt-10 flex-1 flex flex-col gap-2 px-2'>
        {ownerMenuLinks.map((link,index) => (
            <NavLink key={index} to={link.path} className={({isActive}) => `relative flex items-center gap-3 w-full py-3 pl-7 pr-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary font-semibold shadow' : 'text-gray-600 hover:bg-gray-100 hover:shadow'}`}>
                <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="icon" className="w-7 h-7" />
                <span className='max-md:hidden text-base'>{link.name}</span>
                {link.path === location.pathname && <div className='bg-primary w-1.5 h-8 rounded-l absolute right-0 top-1/2 -translate-y-1/2'></div>}
            </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
