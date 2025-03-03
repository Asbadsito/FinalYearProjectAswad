import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'
import SideBar from '../../Components/AppPage/SideBar'
import { useNavigate } from "react-router-dom";


const AppPage = ( {globalUsername} ) => {

  const[showAbsoluteSideBar , setShowAbsoluteSideBar] = useState(false); 
  const changeUrl = useNavigate();

  return (
    <div className='w-full h-full relative'>
      <NavBar className="navBar" globalUsername={globalUsername} setShowAbsoluteSideBar={setShowAbsoluteSideBar}/>
      <div className="appPagesContainer flex flex-row">
        <SideBar />
        <div className="appPagesContentContainer">
          <Outlet />
        </div>
      </div>

      <div className= {`absoluteSideBar lg:hidden w-48 h-full absolute top-0 left-0 z-20 ${showAbsoluteSideBar ? 'show' : ''}`}>
        <div className="content w-full h-full flex-col relative">
          <div className='pl-40 pt-2'>
            <i class="closeIcon fa-solid fa-xmark" onClick={ () => setShowAbsoluteSideBar(false)}></i>
          </div>
          <div className='w-full h-auto '>
            <div className='barSelector w-full h-10 ' onClick={() => changeUrl("/homePage")}>Homepage</div>
            <div className='barSelector w-full h-10' onClick={() => changeUrl("/friendsPage")}>Friends</div>
            <div className='barSelector w-full h-10 ' onClick={() => changeUrl("/recommendationPage")}>Recommendations</div>
            <div className='barSelector w-full h-10' onClick={() => changeUrl("/profilePage")}>Profile</div>
          </div>
        </div>
      </div>
      
       
    </div>
  )
}

export default AppPage