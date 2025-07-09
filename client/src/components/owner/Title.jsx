import React from 'react'

const Title = ({ title, subtitle }) => {
  return (
    <>
      <h1 className='font-medium text-3xl'>{title}</h1>
      <h2 className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subtitle}</h2>
    </>
  )
}

export default Title
