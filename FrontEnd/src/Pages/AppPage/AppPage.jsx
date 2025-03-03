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
       
    </div>
  )
}

export default AppPage