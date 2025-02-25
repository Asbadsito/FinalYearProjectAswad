import React, { useState } from 'react';
import './AuthPage.css';
import ImageSlider from '../Components/Registration/ImageSlider';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [active, setActive] = useState("signin");

  return (
    <div className="authContainer flex flex-col lg:flex-row relative h-screen">

      <div className="imageSliderContainer h-[250px] w-full sm:h-[300px] md:h-[450px] lg:h-full lg:w-[42%] bg-black z-0">
        <ImageSlider />
      </div>

      {/* For my future self : DO NOT CHANGE THIS shit , it took me ages to make the responsive design working*/}
      <div className="registrationContainer flex flex-col lg:h-full lg:w-[58%] flex-grow min-h-[300px] sm:min-h-[50vh]">

        {/* header of the registration */}
        <div className="header w-full flex flex-col items-center py-4">
          <div className="flex flex-row items-center justify-center space-x-4">
            <img src='/images/LogoWellShareNet.png' className='w-44 h-auto' alt="Logo" />
            <p className='text-sm sm:text-sm md:text-lg lg:text-lg text-center'>
              Live a healthier life sharing your lifestyle choices!
            </p>
          </div>
        </div>

        <div className="body-container flex flex-col items-center w-full flex-grow">
          <div className="registrationToggle relative flex flex-row items-center justify-center bg-blue-950 rounded-full h-[40px] w-[240px] overflow-hidden border border-white">

        {/* Leave a comment since I will forget how I did this, consult the frame motion library to know how to 
        implement an asbolute div that will act as the toggle background */}
            <motion.div
              className="absolute top-[4px] left-0 h-[78%] w-[45%] bg-white rounded-full"
              animate={{ x: active === "signin" ? "5%" : "115%" }}
              transition={{ type: "spring", stiffness: 150, damping: 30 }}
            />

            <button
              className={`relative z-10 w-28 h-7 rounded-full transition-all ${
                active === "signin" ? "text-blue-950" : "text-white"
              }`}
              onClick={() => setActive("signin")}
            >
              Sign in
            </button>

            <button
              className={`relative z-10 w-28 h-7 rounded-full transition-all ${
                active === "signup" ? "text-blue-950" : "text-white"
              }`}
              onClick={() => setActive("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* footer - will include the terms and GRPC data things*/}
        <div className='footer h-auto w-full bg-green-400'>
          asdfsadf
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
