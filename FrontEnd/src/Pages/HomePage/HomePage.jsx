import React from 'react'
import './Homepage.css'

const HomePage = () => {
  return (
    <>
      <div className='w-full h-full grid grid-cols-1 lg:grid lg:grid-cols-5 lg:grid-rows-6 gap-4'>
        <div className='workout-container
        lg:col-span-3 content-container w-full rounded-lg sm:w-[80%] md:w-[80%] lg:w-[100%] mx-auto lg:row-span-2 h-44 lg:h-full'>
          <div className='w-full h-full flex'>
            <div className='workouts-header w-full h-[25%] flex rounded-t-lg'>
              <div className='workouts-title pl-4 w-[20%] h-full text-[14px] sm:text-[12px] md:text-[18px]'>Workouts:</div>
              <div className='workouts-search w-[50%] h-full'>
                <input className="workoutSearchInput
                w-24 ml-5 md:ml-0 h-[50%] sm:w-44 sm:h-[60%] md:w-72 lg:w-80 xl:w-[30rem] 
                px-4 py-2 rounded-md border border-gray-600 
                focus:outline-none focus:ring-0 focus:border-transparent
                transition-all duration-300 ease-in-out
                text-[11px] sm:text-[12px] md:text-[14px] leading-[1.5]"
                 type='text' placeholder='Search workout....'>

                 </input>
              </div>
              <div className='w-[30%] h-full flex justify-center items-center'>
                <button className='createWorkoutButton w-20 sm:w-24 md:w-32 lg:w-36 h-[60%] 
                text-[8px] sm:text-[8px] md:text-[12px] lg:text-[13px]'>Create Workout</button>
              </div>
            </div>
          </div>
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