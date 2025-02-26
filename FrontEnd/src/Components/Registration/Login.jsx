import React from 'react'
import "./registration.css"
import PasswordInput from './PasswordInput'
import UserInput from './UserInput'
import { useState } from 'react'

const Login = ({ setActive }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleRegisterSpan = () => {
    setActive("signup")
  };

  return (
    <>
     <div className='loginText w-full flex justify-center mt-3 text-[16px] sm:text-[16px] md:text-[22px] lg:text-[32px] '>Welcome Back! - Sign In </div>
     <div className='credentials flex w-full justify-center mt-2 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]'>Login with your credentials</div>
     
      <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
        <UserInput username={username} setUsername={setUsername} />
      </div> 
      
      <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
          <PasswordInput password={password} setPassword={setPassword} passwordLabel={"Password :"}/>
      </div>

      <div className='flex justify-center w-full mt-6'> 
        <button className='logbut bg-blue-950 border-none outline-none h-8 w-[220px] md:w-[260px] px-2 text-xs sm:text-sm md:h-8 md:text-sm text-white'>Login</button>
      </div>

      <div className='newHere w-full h-5 flex justify-center mt-7'>New here? Create a new account - <span className='ml-1 text-blue-800 ' onClick={handleRegisterSpan} >Register</span></div>


    </>
  )
}

export default Login