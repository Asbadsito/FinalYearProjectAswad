import React from 'react'
import "./registration.css"
import PasswordInput from './PasswordInput'
import UserInput from './UserInput'
import { useState } from 'react'
import axios from 'axios'

const Login = ({ setActive , setUserLoggedIn}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const [fadeError, setFadeError] = useState(false); 


  const handleRegisterSpan = () => {
    setActive("signup")
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      if(!password.trim() || !username.trim()){
        showErrorMessage("Username or Password CANNOT be empty. Please try again.")
        return;
      }

      if(!validatePassword()){
        showErrorMessage("Password CANNOT be shorter than 8 characters AND needs 1 Non-letter character at least.")
        return;
      }

      setErrorMessage("");
      setLoading(true);

      // Make the login request dont forget
      sendLoginRequest();
  }

  const showErrorMessage = (Message) => {
      setErrorMessage(Message)
        setFadeError(false);
        setTimeout(() => {
        setFadeError(true); 
      }, 4000);
    
      setTimeout (() => setErrorMessage("") , 6000)
  }

  const sendLoginRequest = async () => {

    // WRite login request in here 
      const url = "http://localhost:8080/login/loginUser"
      const User = {
        username : username,
        password : password
      };

      try{
        
        const response = await axios.post(url, User ,{
                headers: {
                  'Content-Type' : 'application/json',
                },
        })

        setLoading(false);

        if(response.status == 200){
          showErrorMessage(response.data)
        }
      }
      catch(error){
        setLoading(false)
        showErrorMessage(((error.response ? error.response.data : error.message)))
        setPassword("");
        setUsername("");
      }
  }

  const validatePassword = () => {
    if(password.length < 8){
      return false;
    }

    const passwordRegex = /(?=.*[!@#$%^&*(),.?":{}|<>0-9])/;
    return passwordRegex.test(password);
  };

  return (
    <>
     <div className='loginText w-full flex justify-center mt-3 text-[16px] sm:text-[16px] md:text-[22px] lg:text-[32px] '>Welcome Back! - Sign In </div>
     <div className='credentials flex w-full justify-center mt-2 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]'>Login with your credentials</div>
    
    <div>
      { loading ? (
        <div className="w-full h-60 flex justify-center items-center">
              <img src='/gifs/loading.gif' className='w-10 h-10'></img>
        </div>
        ) : (
      <form onSubmit={handleSubmit}>
        <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
          <UserInput username={username} setUsername={setUsername} />
        </div> 
        
        <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
            <PasswordInput password={password} setPassword={setPassword} passwordLabel={"Password :"}/>
        </div>

        <div className='flex justify-center w-full mt-6'> 
          <button type="submit" className='logbut bg-blue-950 border-none outline-none h-8 w-[220px] md:w-[260px] px-2 text-xs sm:text-sm md:h-8 md:text-sm text-white'>Login</button>
        </div>

        <div className='newHere w-full h-5 flex justify-center mt-7'>New here? Create a new account - <span className='ml-1 text-blue-800 ' onClick={handleRegisterSpan} >Register</span></div>

        {errorMessage && (
            <div className={`error-message text-red-500 text-sm text-center mt-2 opacity-55 ${fadeError ? "fade-out" : ""}`}>
              {errorMessage}
            </div>
          )}
      
      </form>
         )
    } 
    </div>
    </>
  )
}

export default Login