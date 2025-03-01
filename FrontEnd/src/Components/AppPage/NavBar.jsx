import React from 'react'
import './NavBar.css'

const NavBar = ( {setShowSideBar} ) => {
  return (
    <div className='navbar w-full h-14 flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <i className="menuIcon fa-solid fa-bars w-20 h-auto text-white text-2xl transition-transform duration-200 transform hover:scale-105 active:scale-95" onClick={setShowSideBar(true)}></i>
        </div>
        <div className='flex w-28 h-auto items-center'>
            <img src='/images/logo_dc.png' className='w-20 h-auto mr-2'></img>
            <div className='text-xs'>V 0.1.1</div>
        </div>
    </div>
  )
}

export default NavBar