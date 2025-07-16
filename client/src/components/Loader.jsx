import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="relative">
        {/* Outer ring with gradient */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-transparent border-t-blue-500 border-b-blue-700"></div>
        
        {/* Inner ring with different timing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse rounded-full h-24 w-24 border-t-2 border-b-2 border-transparent border-t-blue-400 border-b-blue-600"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  )
}

export default Loader