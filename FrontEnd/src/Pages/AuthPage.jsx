import React from 'react';
import './AuthPage.css';
import ImageSlider from '../Components/Registration/ImageSlider';


const AuthPage = () => { 
  return (
    <div className="authContainer sm: flex-col  md:flex-col  lg:flex-row">
        <div className="imageSliderContainer h-[250px] w-full sm:h-[300px] sm:w-full md:h-[450px] md:w-full lg:h-[100%] lg:w-[42%] bg-lime-800">
          <ImageSlider />
        </div>

        <div className="registrationContainer w-full h-full lg:h-[100%] lg:w-[58%] " ></div>
    </div>
   
  )

  
}

export default AuthPage