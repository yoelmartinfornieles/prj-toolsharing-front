import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '103678780845-vsp1r3hrboarvi7ccaqilouat5kaf9mr.apps.googleusercontent.com';

function LoginGoogle() {

	const handleLogin = async googleData => {  const res = await fetch("/api/v1/auth/google", {
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
		  onSuccess={handleLogin}//{onSuccess}
		  onFailure={handleLogin}//{onFailure}
		  cookiePolicy={'single_host_origin'}
		  style={{ marginTop: '100px' }}
		  isSignedIn={true}
		/>
	  </div>
	);
  }
  
  export default LoginGoogle;
  
  