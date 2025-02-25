import React from 'react';
import './AuthPage.css';
import ImageSlider from '../Components/Registration/ImageSlider';

const AuthPage = () => {
  return (
    <div className="authContainer flex flex-col lg:flex-row relative h-screen">

      <div className="imageSliderContainer h-[250px] w-full sm:h-[300px] md:h-[450px] lg:h-full lg:w-[42%] bg-black z-0">
        <ImageSlider />
      </div>

      {/* The container that has all registration components, for my future self please dont touch this shit I dont understand how I got the responsive design for this working */}
      <div className="registrationContainer flex flex-col lg:h-full lg:w-[58%] flex-grow min-h-[300px] sm:min-h-[50vh]">
        
        {/*Header*/}
        <div className="header w-full flex flex-col items-center py-4">
          <div className="flex flex-row items-center justify-center space-x-4">
            <img src='/images/LogoWellShareNet.png' className='w-44 h-auto' alt="Logo" />
            <p className='text-sm sm:text-sm md:text-lg lg:text-lg text-center'>
              Live a healthier life sharing your lifestyle choices!
            </p>
          </div>
        </div>

        {/*Body (Registration and Login)*/}
        <div className="body-container flex flex-col items-center bg-red-500 w-full flex-grow "> 
          <div className="registrationToggle flex flex-row">
            <button className="SignIn">Sign in</button>
            <button className="SignUp">Sign Up</button>
          </div>

        </div>

        {/*Footer */}
        <div className='footer h-auto w-full bg-green-400'>asdfsadf
          
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
