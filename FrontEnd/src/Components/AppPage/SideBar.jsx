import React, { useState } from 'react'
import './Sidebar.css'
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const[pageSelected , setPageSelected] = useState("home");
  const changeUrl = useNavigate();
   
  return (
    <div className='sidebarContainer  h-full w-44 hidden sm:hidden md:hidden lg:block lg: flex-col'>
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
  )
}

export default SideBar