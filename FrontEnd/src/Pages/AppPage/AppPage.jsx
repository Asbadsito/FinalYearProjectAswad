import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'
import SideBar from '../../Components/AppPage/SideBar'

const AppPage = ( {globalUsername} ) => {

  return (
    <div className='w-full h-full relative'>
      <NavBar className="navBar" globalUsername={globalUsername}/>
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