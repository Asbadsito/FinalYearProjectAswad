import React from 'react'
import './Homepage.css'

const HomePage = () => {
  return (
    <>
      <div className='w-full h-full grid grid-cols-1 lg:grid lg:grid-cols-5 lg:grid-rows-6 gap-4'>
        <div className='lg:col-span-3 content-container w-full rounded-lg sm:w-[80%] md:w-[80%] lg:w-[100%] mx-auto lg:row-span-2 h-44 lg:h-full'>
        </div>

        <div className='lg:row-start-3 content-container w-full rounded-lg sm:w-[80%] md:w-[80%] lg:w-[100%] mx-auto lg:col-span-3 lg:row-span-2 h-44 lg:h-full'>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-2 lg:row-span-4 lg:col-start-4'>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-5'>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5'>
        </div>
      </div>
    </>
  )
}

export default HomePage