import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200'></div>
    </div>
  )
}

export default Loader
