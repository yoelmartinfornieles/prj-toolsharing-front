
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
//import { Link } from "react-router-dom";
import  UserInfo  from "../components/profileComponents/UserInfo"
import axios from "axios"
import UserProducts from "../components/profileComponents/UserProducts"
import {MYNETWORK} from "../utils/paths";




function ProfilePage(){
	
	const { user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState ("")
	
	let API_URL = process.env.REACT_APP_API_URL
	
	let userId = user._id



	useEffect(() => {
		
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			console.log ("response: ", response)
			setUserInfo(response)
		 }
		)
	}, 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[])
	
	
	
	if (userInfo) {

	return (
		<>
			<nav>
				<UserInfo  userInfo={userInfo}/>
				<a className="" href={MYNETWORK}>GO TO MY NETWORK<img alt=""/></a>
				<UserProducts userInfo={userInfo}/>
			</nav>
		</>
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