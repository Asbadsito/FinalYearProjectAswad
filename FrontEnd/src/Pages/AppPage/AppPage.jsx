import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'

const AppPage = () => {

  const[showSideBar , setShowSideBar] = useState(false);
  
  return (
    <>
      <NavBar className="navBar" setShowSideBar={setShowSideBar}/>
      <div className="appPagesContainer">
        <div className="appPagesContentContainer">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AppPage