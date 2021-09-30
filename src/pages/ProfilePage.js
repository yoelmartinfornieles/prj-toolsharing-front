
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import  UserInfo  from "../components/UserInfo"
import axios from "axios"



function ProfilePage(){
	const { isLoggedIn, user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState ("")
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id



	useEffect(() => {
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
	
	console.log(userInfo)
	
	if (userInfo) {

	return (
		<nav>
			<UserInfo  userInfo={userInfo}/>
		</nav>
	  );
	}
	else {
		return (
			<>
			No user information
			</>
		)
	}
}


export default ProfilePage