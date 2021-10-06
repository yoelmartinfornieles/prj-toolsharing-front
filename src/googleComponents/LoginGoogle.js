import axios from "axios";
import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import { useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import { AuthContext } from "./../context/auth.context";

const clientId = "103678780845-vsp1r3hrboarvi7ccaqilouat5kaf9mr.apps.googleusercontent.com"//process.env.GOOGLE_ID

function LoginGoogle(props) {
	const [errorMessage, setErrorMessage] = useState(undefined);
    const API_URL = process.env.REACT_APP_API_URL;
	const { logInUser } = useContext(AuthContext);
	let history = useHistory();

	const onSuccess = (res) => {
	  const googleObject = res.profileObj;
	  const requestBody = {email: googleObject.email, username: googleObject.name, password: googleObject.googleId }
/* 	  console.log('Login Success: currentUser:', res.profileObj);
 *//* 	  alert(
		`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
	  ); */
	  axios
	  .post(API_URL+"/google", requestBody)
	  .then((response) => {
        let req = {email:requestBody.email, subject:"Welcome to Tooly", message:"You succesfully registered, enjoy"}
        const token = response.data.authToken;
        logInUser(token);
		console.log("Signed up correct WITH GOOGLE")
		axios
        .post (`${API_URL}/send-email`, req)
        .then ( (response) => {
        console.log("EMAIL sent successfully", response.data)
        props.history.push("/profile")});
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})

	  refreshTokenSetup(res);

	};
  
	const onFailure = (res) => {
/* 	  console.log('Login failed: res:', res);
	  alert(
		`Failed to login. 😢 `
	  ); */
	};
  
	return (
	  <div>
		<GoogleLogin
		  clientId={clientId}
		  buttonText="Login"
		  onSuccess={onSuccess}//{handleLogin}
		  onFailure={onFailure}//{handleLogin}
		  cookiePolicy={'single_host_origin'}
		  style={{ marginTop: '100px' }}
		  isSignedIn={true}
		/>
	  </div>
	);
  }
  
  export default LoginGoogle;
  
  