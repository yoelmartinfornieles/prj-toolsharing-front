import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '103678780845-vsp1r3hrboarvi7ccaqilouat5kaf9mr.apps.googleusercontent.com';

function LoginGoogle() {

/* 	const handleLogin = async googleData => {  const res = await fetch("/api/v1/auth/google", 
	  {
		method: "POST",
		body: JSON.stringify({
		token: googleData.tokenId
	  }),
	  headers: {
		"Content-Type": "application/json"
	  }
	})  
	
	const data = await res.json()
	// store returned user somehow
  } */

/*   const handleLogin2 = (res) => {
    const requestBody = { username, password };
	axios.post(`${API_URL}/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        const token = response.data.authToken;
        logInUser(token);
        history.push("/profile");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    })

  } */

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
  
  