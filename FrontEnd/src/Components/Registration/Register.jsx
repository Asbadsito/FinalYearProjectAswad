import React, { useState } from 'react'
import "./registration.css"
import UserInput from './UserInput'
import PasswordInput from './PasswordInput'

const Register = () => {
 
  const[username , setUsername] = useState("")
  const[password , setPassword] = useState("")

  return (
    <>
     <div className='loginText w-full flex justify-center mt-3 text-[16px] sm:text-[16px] md:text-[22px] lg:text-[32px] '>Register - Sign Up </div>
     <div className='credentials flex w-full justify-center mt-2 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]'>Create a new Account</div>

     <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
        <UserInput username={username} setUsername={setUsername} />
     </div> 

     <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
          <PasswordInput password={password} setPassword={setPassword} passwordLabel={"Password :"}/>
     </div>

     <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
          <PasswordInput password={password} setPassword={setPassword} passwordLabel={"Repeat Password :"}/>
     </div>

      <div className='flex justify-center w-full mt-6'> 
        <button className='logbut bg-blue-950 border-none outline-none h-8 w-[220px] md:w-[260px] px-2 text-xs sm:text-sm md:h-8 md:text-sm text-white'>Register</button>
      </div>
    </>
  )
}

export default Register