import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'

const AppPage = () => {
  return (
    <>
      <NavBar className="navBar" />
      <div className="appPagesContainer">
        <div className="appPagesContentContainer">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AppPage