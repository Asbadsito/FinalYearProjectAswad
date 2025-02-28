import { useState } from "react"
import "./index.css"
import AuthPage from "./Pages/AuthPage"
function App() {

  const[isUserLoggedIn , setUserLoggedIn] = useState(false)

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
