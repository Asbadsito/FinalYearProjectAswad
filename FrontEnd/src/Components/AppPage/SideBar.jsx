import React, { useState } from 'react'
import './Sidebar.css'
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const[buttonSelected , setButtonSelected] = useState(null);
  const changeUrl = useNavigate();
   
  return (
    <div className='sidebarContainer  h-full w-44 hidden sm:hidden md:hidden lg:block lg: flex-col'>
      <div className='barSelector w-full h-10 mt-6'>
        <button onClick={() => changeUrl("/homePage")}>Homepage</button>
      </div>
      <div className='barSelector w-full h-10'>
        <button onClick={() => changeUrl("/friendsPage")}>Friends</button>
      </div>
      <div className='barSelector w-full h-10'>
        <button onClick={() => changeUrl("/recommendationPage")}>Recommendations</button>
      </div>
      <div className='barSelector w-full h-10 '>
        <button onClick={() => changeUrl("/profilePage")}>Profile</button>
      </div>
    </div>
  )
}

export default SideBar