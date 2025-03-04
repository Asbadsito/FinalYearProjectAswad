import React, { useState } from 'react'
import './Sidebar.css'
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const[pageSelected , setPageSelected] = useState("home");
  const changeUrl = useNavigate();
   
  return (
    <div className='sidebarContainer  h-full w-44 hidden sm:hidden md:hidden lg:block lg: flex-col'>
      <div 
        className={` w-full h-10 mt-4 ${pageSelected === "home" ? "selectedDiv" : "barSelector"}`}
        onClick={() => { setPageSelected("home"); changeUrl("/homePage"); }}>
          Homepage
      </div>
      
      <div 
        className={`w-full h-10 ${pageSelected === "friends" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/friendsPage") ; setPageSelected("friends")}}>
          Friends
      </div>

      <div 
        className={`w-full h-10 ${pageSelected === "recommendation" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/recommendationPage") ; setPageSelected("recommendation")}}>
          Recommendations
      </div>

      <div 
        className={`w-full h-10 ${pageSelected === "profile" ? "selectedDiv" : "barSelector"}`}
        onClick={() => {changeUrl("/profilePage") ; setPageSelected("profile")}}>
          Profile
      </div>
    </div>
  )
}

export default SideBar