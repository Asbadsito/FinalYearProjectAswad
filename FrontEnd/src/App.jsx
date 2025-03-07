import { useEffect, useState } from "react"
import "./index.css"
import AuthPage from "./Pages/AuthPage/AuthPage"
import AppPage from "./Pages/AppPage/AppPage"
import HomePage from "./Pages/HomePage/HomePage"
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import FriendsPage from "./Pages/FriendsPage/FriendsPage"
import RecommendationPage from "./Pages/RecommendationPage/RecommendationPage"


function App() {

  const[isUserLoggedIn , setUserLoggedIn] = useState(false);
  const[loadingScreen , setLoadingScreen] = useState(false);
  const[globalUsername , setGlobalUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    setUserLoggedIn(true)
    const token = localStorage.getItem('authToken');
    console.log("Token from localStorage: ", token); 

    if(localStorage.getItem("username")){
      setGlobalUsername(localStorage.getItem("username"))
    }

    if (token) {
      if(checkIfTokenIsValid(token)){
        console.log("Token was valid")
      setUserLoggedIn(true);
      } 
      else {
        console.log("Token was not valid")
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
     
      <div className="app_container w-full h-full relative">
        {loadingScreen ? (
          <div className="loading-screen flex flex-col justify-center">
            <img src="/gifs/loadingGif3.gif" className="w-36 h-auto"></img>
            <div className="text-black text-[20px] animate-pulse"> Loading... </div>
          </div>
        ) : isUserLoggedIn ? (
          <Routes>
            <Route path="/" element={<AppPage globalUsername={globalUsername}/>}>
              <Route index element={<Navigate to="/homePage" />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/profilePage" element={<ProfilePage />} />
              <Route path="/friendsPage" element={<FriendsPage />} />
              <Route path="/recommendationPage" element={<RecommendationPage />} />
            </Route>
          </Routes>
        ) : (
          <AuthPage setUserLoggedIn={setUserLoggedIn} setLoadingScreen={setLoadingScreen} setGlobalUsername={setGlobalUsername}/>
        )}
      </div>

    </Router>
    
  )
}

export default App
