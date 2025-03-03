import React, { useState } from 'react'
import './Sidebar.css'
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const[buttonSelected , setButtonSelected] = useState(null);
  const changeUrl = useNavigate();
   
  return (
    <div className='sidebarContainer  h-full w-44 hidden sm:hidden md:hidden lg:block lg: flex-col'>
      <div className='barSelector w-full h-10 mt-6' onClick={() => changeUrl("/homePage")}>Homepage</div>
      <div className='barSelector w-full h-10' onClick={() => changeUrl("/friendsPage")}>Friends</div>
      <div className='barSelector w-full h-10'onClick={() => changeUrl("/recommendationPage")}>Recommendations</div>
      <div className='barSelector w-full h-10 'onClick={() => changeUrl("/profilePage")}>Profile</div>
    </div>
  )
}

export default SideBar