import React, { useEffect, useState } from 'react'
import './NavBar.css'

const NavBar = ( {globalUsername , globalId ,  setShowAbsoluteSideBar} ) => {

  useEffect(() => {
    console.log(globalUsername)
  },[])


  return (
    <div className='navbar w-full h-14 flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <i class="absoluteSideBarIcon fa-solid fa-bars text-[24px] mr-4 lg:hidden hover:scale-110 hover:opacity-70 transition-all duration-300" onClick={ () => setShowAbsoluteSideBar(prevState => !prevState)}></i>
          <img src='/images/logo_dc.png' className='w-20 h-auto mr-2'></img>
          <div className='text-xs'>V 0.1.1</div>
        </div>
        <div className='flex w-auto h-auto items-center'>
          <p className='id text-[10px] mr-4'>{globalId}</p>
          <i class="accountIcon fa-solid fa-circle-user"></i>
          <p className='username ml-3'> {globalUsername}</p>
        </div>
    </div>
  )
}

export default NavBar