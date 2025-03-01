import React, { useState } from 'react';
import './AuthPage.css';
import ImageSlider from '../../Components/Registration/ImageSlider';
import { motion } from 'framer-motion';
import Login from '../../Components/Registration/Login';
import Register from '../../Components/Registration/Register';

const AuthPage = ({setUserLoggedIn , setLoadingScreen}) => {
  const [active, setActive] = useState("signin");

  return (
    <div className="authContainer flex flex-col lg:flex-row relative h-screen">

      <div className="imageSliderContainer h-[250px] w-full sm:h-[300px] md:h-[450px] lg:h-full lg:w-[42%] bg-black z-0">
        <ImageSlider />
      </div>

      {/* For my future self : DO NOT CHANGE THIS shit , it took me ages to make the responsive design working for this specific div*/}
      <div className="registrationContainer flex flex-col lg:h-full lg:w-[58%] flex-grow min-h-[300px] sm:min-h-[50vh] ">

        {/* header of the registration */}
        <div className="header w-full flex flex-col items-center py-2 lg:mt-8">
          <div className="flex flex-row items-center justify-center space-x-4 gap-2 pr-1">
            <img src='/images/LogoWellShareNet.png' className='w-20 h-auto sm:w-20 md:w-24 lg:w-32' alt="Logo" />
            
          </div>
        </div>

        <div className="body-container flex flex-col items-center w-full flex-grow">
          <div className="registrationToggle relative flex flex-row items-center justify-center 
                        bg-blue-950 rounded-lg 
                          h-[24px] sm:h-[34px] w-full max-w-[140px] sm:max-w-[220px] 
                          overflow-hidden border border-white">

        {/* Leave a comment since I will forget how I did this, consult the frame motion library documentation to know how to 
        implement an asbolute div that will act as the toggle background */}
            <motion.div
              className="absolute sm:top-[5px] left-[5%] sm:left-[3%] h-[70%] sm:h-[70%] w-[40%] sm:w-[42%] bg-white rounded-lg"
              animate={{ x: active === "signin" ? "0%" : "124%" }}
              transition={{ type: "spring", stiffness: 150, damping: 30 }}
            />

            <button
              className={`relative z-10 w-full h-full rounded-md transition-all text-[10px] sm:text-xs ${
                active === "signin" ? "text-blue-950" : "text-white"
              }`}
              onClick={() => setActive("signin")}
            >
              Sign in
            </button>

            <button
              className={`relative z-10 w-full h-full rounded-md transition-all text-[10px] sm:text-xs ${
                active === "signup" ? "text-blue-950" : "text-white"
              }`}
              onClick={() => setActive("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="registrationInputContainer w-full flex-1 mt-1 flex flex-col pt-2">
            {active === "signin" ? <Login setActive={setActive} setUserLoggedIn={setUserLoggedIn} setLoadingScreen={setLoadingScreen}/> : <Register setActive={setActive} /> }
          </div>
        </div>

        {/* footer - will include the terms and GRPC data things*/}
        <div className='footer h-auto w-full flex justify-center gap-6 lg:mb-16'>
          <p className='text-sm'>Terms and Conditions Apply</p>
          <p className='text-sm'>Read Our GDPR policies</p>
          <p className='text-sm'>Github repository</p>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
