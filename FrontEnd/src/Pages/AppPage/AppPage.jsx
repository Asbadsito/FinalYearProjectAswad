import React from 'react'
import { Outlet } from 'react-router-dom'

const AppPage = () => {
  return (
    <div className='flex justify-center text-[30px] text-black'>If this works then it means react router works
    <Outlet />
    </div>
  )
}

export default AppPage