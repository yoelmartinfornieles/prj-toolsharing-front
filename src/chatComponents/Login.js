import React from "react";
import axios from "axios";
import {useEffect, useContext} from "react"
import { AuthContext } from "../context/auth.context";
import { useHistory } from "react-router-dom";

function Login () {
    let history=useHistory();
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        let API_URL = process.env.REACT_APP_API_URL
        let userId = user._id
        
        console.log("user: ", user) 
        console.log("useEffect")
        axios
        .get (API_URL+"/user/"+userId)
        .then ((response)=> {
            console.log ("response: ", response)
            /* setUserInfo(response.data) */
            const { username, email, imgUrl } = response.data
            /* Generate random number that will be serve as the ID of the user */
            const userData = {
                name: username,
                email: email,
                id: userId,
                role: "Member",
                photoUrl: imgUrl
            }

            /* Store user data in browser's local storage */
            localStorage.setItem("currentTalkjsUser", JSON.stringify(userData))
            /* Redirect to the my network page */
            history.push("/mynetwork");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        ) 
        }, 
        [])
    
    return (
        <nav>
            Loading...
        </nav>
    )
    
 }

export default Login 

/* 

function Login () {

    const { isLoggedIn, user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState ("")
    let API_URL = process.env.REACT_APP_API_URL
    let userId = user._id
 
 
 useEffect(() => {
     console.log("user: ", user)
     console.log("useEffect")
     axios
      .get (API_URL+"/user/"+userId)
      .then ((response)=> {
         console.log ("response: ", response)
         setUserInfo(response)
      }
     )
 }, 
 [])
 
 return (
     <nav>
         {userInfo.username}
     </nav>
 )
 
 }
 */