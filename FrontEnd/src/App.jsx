import { useEffect, useState } from "react"
import "./index.css"
import AuthPage from "./Pages/AuthPage"
function App() {

  const[isUserLoggedIn , setUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      if(checkIfTokenIsValid){
      setUserLoggedIn(true);
      } 
      else {
      setUserLoggedIn(false);
      }
    }
  }, []);  


  const checkIfTokenIsValid = (token) => {
    try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; 

    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
  }

  return (
    <>
     <div className='app-container'>
      {isUserLoggedIn 
          ? (<div className="flex justify-center text-[30px] font-semibold">Hello my friend!</div>) 
          : (<AuthPage setUserLoggedIn={setUserLoggedIn}/>)
      }
      </div>     
    </>
  )
}

export default App
