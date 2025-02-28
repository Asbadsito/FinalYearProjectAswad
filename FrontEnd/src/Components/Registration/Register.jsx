import React, { useState } from 'react'
import "./registration.css"
import UserInput from './UserInput'
import PasswordInput from './PasswordInput'
import axios from 'axios'

const Register = ( {setActive} ) => {
 
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [repeatPassword , setRepeatPassword] = useState("")
  const [loading , setLoading] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const [fadeError, setFadeError] = useState(true); 
  const [fadeSuccess, setFadeSuccess] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!password.trim() || !username.trim() || !repeatPassword.trim()){
        showErrorMessage("Username and Password CANNOT be empty. Please try again.")
        return;
      }
      
      if(!validatePassword()){
        showErrorMessage("Password is not valid. Please enter a password longer than 7 characters AND at least 1 special character or number")
        return;
      }

      if(!validateUsername()){
        showErrorMessage("Username is not valid. Please enter a username longer than 4 characters")
        return;
      }

      if(!(password == repeatPassword)){
        showErrorMessage("Passwords do not match. Please make sure to repeat your password")
        return;
      }

      setLoading(true)
      setErrorMessage("");
      
      // Make the registration request in here 
      sendRegistrationRequest()

  }

  const showErrorMessage = (Message) => {
    setErrorMessage(Message)
    setFadeError(false);
    setTimeout(() => {
        setFadeError(true); 
    }, 4000);
    
    setTimeout (() => setErrorMessage("") , 6000)
  }

  const sendRegistrationRequest = async () => {
    // Here I make the login logic GET request
    const User = {
      username: username ,
      password: password
    };

    const url = "http://localhost:8080/registration/registerUser"

    try{
        const response = await axios.post(url , User , {
            headers: {
              'Content-Type' : 'application/json',
            },
        })

        setLoading(false)
        setSuccessMessage(response.data)
        setErrorMessage("")
        setFadeSuccess(false);  
        setTimeout(() => setFadeSuccess(true) , 4000);
        setTimeout(() => setActive("signin") , 5000)
    }
    catch(error){
        setLoading(false)
        showErrorMessage(('Error: ' + (error.response ? error.response.data : error.message)))
    }

  }

  const validatePassword = () => {
    if(password.length < 8){
      return false;
    }

    const passwordRegex = /(?=.*[!@#$%^&*(),.?":{}|<>0-9])/;
    return passwordRegex.test(password);
  };

  const validateUsername = () => {
    if(username.length < 5){
      return false;
    }

    return true;
  };

  return (
    <>
     <div className='loginText w-full flex justify-center mt-3 text-[16px] sm:text-[16px] md:text-[22px] lg:text-[32px] '>Register - Sign Up </div>
     <div className='credentials flex w-full justify-center mt-2 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]'>Create a new Account</div>
    
     <div>
      {/* Ugly code here but if loading is true it will show the loading wheel gif spinning otherwise just shows the register form*/}
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

        <div className='passwordCredentialsContainer w-full flex justify-center relative mt-2'>
              <PasswordInput password={repeatPassword} setPassword={setRepeatPassword} passwordLabel={"Repeat Password :"}/>
        </div>

          <div className='flex justify-center w-full mt-6'> 
            <button type="submit" className='logbut bg-blue-950 border-none outline-none h-8 w-[220px] md:w-[260px] px-2 text-xs sm:text-sm md:h-8 md:text-sm text-white'>Register</button>
          </div>

          {errorMessage && (
            <div className={`error-message text-red-500 text-sm text-center mt-4 ${fadeError ? "fade-out" : ""}`}>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className={`success-message text-green-500 text-sm text-center mt-4 ${fadeSuccess ? "fade-out" : ""}`}>
              {successMessage}
            </div>
          )}

      </form>
        )
    } 
    </div>
    </>
  )
}

export default Register