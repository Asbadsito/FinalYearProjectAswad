import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'
import SideBar from '../../Components/AppPage/SideBar'


const AppPage = ( {globalUsername} ) => {

  const[showAbsoluteSideBar , setShowAbsoluteSideBar] = useState(false); 

  return (
    <div className='w-full h-full relative'>
      <NavBar className="navBar" globalUsername={globalUsername} setShowAbsoluteSideBar={setShowAbsoluteSideBar}/>
      <div className="appPagesContainer flex flex-row">
        <SideBar />
        <div className="appPagesContentContainer">
          <Outlet />
        </div>
      </div>

      <div className= {`absoluteSideBar w-48 h-full absolute top-0 left-0 z-20 ${showAbsoluteSideBar ? 'show' : ''}`}>
        <div className="content w-full h-full flex-col relative">
          <i class="closeIcon fa-solid fa-xmark" onClick={ () => setShowAbsoluteSideBar(false)}></i>
        </div>
      </div>
      
       
    </div>
  )
}

export default AppPage