import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
    
  const verifyStoredToken = () => { 
    const storedToken = localStorage.getItem("authToken");
    
    if (storedToken) {
      axios.get(
        `${API_URL}/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
        setTimeout(() => {
          loginChat(response.data)
        }, 500);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      });

    } else {
      setIsLoading(false);
    }
  }

  function loginChat (currentUser) {
       
    let API_URL = process.env.REACT_APP_API_URL
    let userId = currentUser._id
    
    axios
    .get (API_URL+"/user/"+userId)
    .then ((response)=> {
        const { username, email, imgUrl } = response.data
        const userData = {
            name: username,
            email: email,
            id: userId,
            role: "Member",
            photoUrl: imgUrl
        }

        localStorage.setItem("currentTalkjsUser", JSON.stringify(userData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }) 
  }

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();
  }

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentTalkjsUser");
    setIsLoggedIn(false);
    setUser(null);
  }     

  useEffect(() => {
    verifyStoredToken();
  },        
  // eslint-disable-next-line react-hooks/exhaustive-deps
   []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, logInUser, logOutUser, loginChat }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };