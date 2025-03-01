import { useEffect, useState } from "react"
import "./index.css"
import AuthPage from "./Pages/AuthPage/AuthPage"
import AppPage from "./Pages/AppPage/AppPage"
import HomePage from "./Pages/HomePage/HomePage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import ProfilePage from "./Pages/ProfilePage/ProfilePage"


function App() {

  const[isUserLoggedIn , setUserLoggedIn] = useState(false)

  useEffect(() => {
    setUserLoggedIn(true)
    const token = localStorage.getItem('authToken');
    console.log("Token from localStorage: ", token); 

    if (token) {
      if(checkIfTokenIsValid(token)){
        console.log("Token was valid")
      setUserLoggedIn(true);
      } 
      else {
        console.log("Token was not valid, setting the logged in to false")
      setUserLoggedIn(false);
      }
    }
    else{
      console.log("No token found in local storage")
      setUserLoggedIn(false);
    }
  }, []);  


  const checkIfTokenIsValid = (token) => {
    
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 

    if (decodedToken.exp > currentTime) {
      console.log("Token is valid:");
      return true; 
    } 
    else {
      console.log("Token has expired:");
      return false; 
    }
  } 
  

  return (
     <Router>
      <div className="app_container">
        {isUserLoggedIn ? (
          <Routes>
            <Route path="/" element={<AppPage />}>
              <Route path="/homePage" element={<HomePage />}/>
              <Route path="/profilePage" element={<ProfilePage />}/>
            </Route>
          </Routes>
          
        ) : (
          <AuthPage setUserLoggedIn={setUserLoggedIn} />
        )}
      </div>
    </Router>
    
  )
}

export default App
