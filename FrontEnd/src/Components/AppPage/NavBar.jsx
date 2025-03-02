import React, { useEffect } from 'react'
import './NavBar.css'

const NavBar = ( {globalUsername} ) => {

  useEffect(() => {
    console.log(globalUsername)
  },[])

  return (
    <div className='navbar w-full h-14 flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <img src='/images/logo_dc.png' className='w-20 h-auto mr-2'></img>
          <div className='text-xs'>V 0.1.1</div>
        </div>
        <div className='flex w-28 h-auto items-center'>
          <i class="accountIcon fa-solid fa-circle-user"></i>
          <p className='username ml-3'> {globalUsername}</p>
        </div>
    </div>
  )
}

export default NavBar