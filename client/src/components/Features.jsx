import React, { useState, useEffect } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Features = () => {
  const navigate = useNavigate();
  const { cars, user } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const favoriteIds = user?.favorites || [];
  const sortedCars = [...cars].sort((a, b) => {
    const aFav = favoriteIds.includes(a._id);
    const bFav = favoriteIds.includes(b._id);
    return aFav === bFav ? 0 : aFav ? -1 : 1;
  });

  const visibleCars = sortedCars.slice(0, 5);
  const cardCount = visibleCars.length;
  const radius = isMobile ? 240 : 400;
  const cardWidth = isMobile ? 320 : 480;   // 🔥 Wider cards
  const cardHeight = isMobile ? 500 : 525;  // 🔥 Taller cards

  const [currentIndex, setCurrentIndex] = useState(0);
  const angle = -currentIndex * (360 / cardCount);

  const rotateLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + cardCount) % cardCount);
  };

  const rotateRight = () => {
    setCurrentIndex((prev) => (prev + 1) % cardCount);
  };

  return (
    <div className="flex flex-col items-center py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-5xl text-center mb-16">
        <Title
          title="🚗 Premium Collection"
          subtitle="Experience our finest vehicles in stunning 3D rotation"
        />
      </div>

      <div className="relative w-full max-w-7xl min-h-[800px]">
        {/* Left Arrow */}
        <button
          onClick={rotateLeft}
          className="absolute left-0 z-20 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-50 backdrop-blur-md rounded-full p-4 shadow-xl ring-1 ring-gray-200 transition-all duration-300"
          style={{ transform: 'translateX(-50%)' }}
        >
          <img src={assets.arrow_icon} alt="left" className="w-6 h-6 rotate-180" />
        </button>

        {/* 3D Carousel */}
        <div
          className="relative w-full min-h-[800px] mx-auto overflow-visible"
          style={{ perspective: '1600px' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center overflow-visible"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${angle}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {visibleCars.map((car, idx) => {
              const theta = (360 / cardCount) * idx;
              const scale =
                1 - Math.abs(Math.sin(((theta + angle) * Math.PI) / 180)) * 0.2;

              return (
                <div
                  key={car._id}
                  className="absolute rounded-2xl overflow-visible shadow-2xl ring-1 ring-gray-200 bg-white hover:scale-105 transition-transform"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    transform: `
                      rotateY(${theta}deg)
                      translateZ(${radius}px)
                      scale(${scale})
                    `,
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))',
                    zIndex: Math.round(scale * 100),
                  }}
                >
                  <CarCard car={car} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={rotateRight}
          className="absolute right-0 z-20 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-50 backdrop-blur-md rounded-full p-4 shadow-xl ring-1 ring-gray-200 transition-all duration-300"
          style={{ transform: 'translateX(50%)' }}
        >
          <img src={assets.arrow_icon} alt="right" className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-4 mt-10">
        {visibleCars.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'bg-blue-600 w-6 scale-110 shadow-md'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/cars')}
        className="group flex items-center justify-center gap-2 mt-16 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
      >
        <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
          Explore All Vehicles
        </span>
        <img
          src={assets.arrow_icon}
          alt="arrow"
          className="w-5 h-5 transform group-hover:translate-x-1 transition-all duration-300"
        />
      </button>
    </div>
  );
};

export default Features;
