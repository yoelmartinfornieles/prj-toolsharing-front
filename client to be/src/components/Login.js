import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import axios from "axios";

/* const clientId = '103678780845-vsp1r3hrboarvi7ccaqilouat5kaf9mr.apps.googleusercontent.com';
 */
function Login() {
	const APIURL = "http://localhost:5005"

	const handleLogin = async googleData => { 
		var profile = googleData.getBasicProfile();

  		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  		console.log('Name: ' + profile.getName());
  		console.log('Image URL: ' + profile.getImageUrl());
  		console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

		var id_token = googleData.getAuthResponse().id_token;

		console.log ("idtoken: ", id_token)
		  
		var xhr = new XMLHttpRequest();
		xhr.open('POST', APIURL+'/google');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function() {
  		console.log('Signed in as: ' + xhr.responseText);
		};
		xhr.send('idtoken=' + id_token);
/* 		axios
		.post (APIURL+"/google",
		{
			method: "POST",
			body: JSON.stringify({
			token: id_token
		  }),
		  headers: {
			"Content-Type": "application/json"
		  }
		}
		)

		.then ( (res) => 
			console.log ("post done, res: ", res)  

		) */
  }

	const onSuccess = (res) => {
	  console.log('Login Success: currentUser:', res.profileObj);
	  alert(
		`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
	  );
	  refreshTokenSetup(res);
	};
  
	const onFailure = (res) => {
	  console.log('Login failed: res:', res);
	  alert(
		`Failed to login. 😢 `
	  );
	};
  
	return (
	  <div>
		<GoogleLogin
		  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
		  buttonText="Login"
		  onSuccess={onSuccess}//{onSuccess}
		  onFailure={handleLogin}//{onFailure}
		  cookiePolicy={'single_host_origin'}
		  style={{ marginTop: '100px' }}
		  isSignedIn={true}
		/>
	  </div>
	);
  }
  
  export default Login;
  
  