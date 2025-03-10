import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/AppPage/NavBar'
import './AppPage.css'
import SideBar from '../../Components/AppPage/SideBar'
import { useNavigate } from "react-router-dom";


const AppPage = ( {globalUsername , globalId , overlay} ) => {

  const[showAbsoluteSideBar , setShowAbsoluteSideBar] = useState(false); 
  const[pageSelected , setPageSelected] = useState("home");
  const changeUrl = useNavigate();
  

  return (
    <div className='w-full h-full relative'>
      {overlay && (<div className='overlay w-full h-full absolute z-40'></div>)}
      <NavBar className="navBar" globalUsername={globalUsername} globalId={globalId} setShowAbsoluteSideBar={setShowAbsoluteSideBar} setPageSelected={setPageSelected}/>
      <div className="appPagesContainer flex flex-row">
        <SideBar setPageSelected={setPageSelected} pageSelected={pageSelected}/>
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
      
      <div 
        className={` w-full h-10 mt-4 flex items-center ${pageSelected === "home" ? "selectedDiv" : "barSelector"}`}
        onClick={() => { setPageSelected("home"); changeUrl("/homePage"); }}>
          <i class="fa-solid fa-house mr-1"></i>
          <div className='mt-[1px] ml-[2px]'>Home</div>
      </div>
      
      <div 
        className={`w-full h-10 flex items-center ${pageSelected === "friends" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/friendsPage") ; setPageSelected("friends")}}>
          <i class="fa-solid fa-user-group mr-1"></i>
          <div className='mt-[1px] ml-[2px]'>Friends</div>
      </div>

      <div 
        className={`w-full h-10 flex items-center ${pageSelected === "recommendation" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/recommendationPage") ; setPageSelected("recommendation")}}>
          <i class="fa-solid fa-lightbulb mr-1 text-[19px]"></i> 
          <div className='mt-[1px] ml-[2px]'>Recommendations</div>
      </div>

      <div 
        className={`w-full h-10 flex items-center ${pageSelected === "profile" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/profilePage") ; setPageSelected("profile")}}>
          <i class="fa-solid fa-user mr-1 "></i>
          <div className='mt-[1px] ml-[2px]'>Profile</div>
      </div>
      </div>
    </div>
    </div>
      
       
  </div>
  )
}

export default AppPage