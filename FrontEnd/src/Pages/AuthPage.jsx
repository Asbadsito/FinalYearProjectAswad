import React from 'react';
import './AuthPage.css';
import ImageSlider from '../Components/Registration/ImageSlider';

const AuthPage = () => {
  return (
    <div className="authContainer sm:flex-col md:flex-col lg:flex-row relative">
        <div className="imageSliderContainer h-[250px] w-full sm:h-[300px] sm:w-full md:h-[450px] md:w-full lg:h-[100%] lg:w-[42%] bg-black z-0">
          <ImageSlider />
        </div>

       <div className="registrationContainer w-full h-full lg:h-[100%] lg:w-[58%] shadow-[-30px_0px_120px_25px_rgba(0,0,0,0.9)] z-10 absolute top-0 right-0">
        
        </div>
    </div>
  );
}

export default AuthPage;
