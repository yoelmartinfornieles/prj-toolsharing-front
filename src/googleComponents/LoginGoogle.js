import axios from "axios";
import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import { useContext } from "react";
import {useHistory} from "react-router-dom"
import { AuthContext } from "./../context/auth.context";

function LoginGoogle(props) {
  const clientId = process.env.REACT_APP_LOGIN_GOOGLE;
  const API_URL = process.env.REACT_APP_API_URL;
  const { logInUser } = useContext(AuthContext);
  let history = useHistory();
  //var { clickToShow } = props;

  const onSuccess = (res) => {
	const googleObject = res.profileObj;
	const requestBody = {email: googleObject.email, username: googleObject.name, password: googleObject.googleId }
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
	  history.push("/profile")});
	})
	.catch((error) => {
		console.log("error: ", error);
	  })

	refreshTokenSetup(res);

  };

/*   const onSuccess = (res) => {
    clickToShow();
    const googleObject = res.profileObj;
    const requestBody = {
      email: googleObject.email,
      username: googleObject.name,
      password: googleObject.googleId,
    };
	console.log("ANTES DE EMPEZAR: ", typeof googleObject.email )

    axios
      .post(API_URL+"/user/email", googleObject.email)
      .then((res) => {
		console.log ("RES: ", res.data)
        if (res.data === "1") {
          console.log("USUARIO ENCONTRADO");
          axios
            .post(`${API_URL}/google`, requestBody)
            .then((response) => {
              const token = response.data.authToken;
              logInUser(token);
              history.push("/profile");
            })
            .catch((error) => {
              const errorDescription = error;
              setErrorMessage(errorDescription);
            });
        } else if (res.data === "0") {
          console.log("USUARIO NO ENCONTRADO");
		  console.log("REQUEST_BODY", requestBody)
          axios
            .post(`${API_URL}/signup`, requestBody)
            .then((response) => {
              console.log("signed up correct");
              let req = {
                email: requestBody.email,
                subject: "Welcome to Tooly",
                message: "You succesfully registered, enjoy",
              };
              axios.post(`${API_URL}/send-email`, req)
			  .then((response) => {
                console.log("email sent successfully", response.data);
                axios
                  .post(`${API_URL}/google`, requestBody)
                  .then((response) => {
                    console.log("logged in correct");
                    const token = response.data.authToken;
                    logInUser(token);
                    history.push("/profile");
                  })
                  .catch((error) => {
                    console.log("error: ", error);
                  });
              });
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        }
      })
      .catch((error) => {
        const errorDescription = error;
        setErrorMessage(errorDescription);
      });
	  refreshTokenSetup(res);
  }; */

  const onFailure = (res) => {
    /* 	  console.log('Login failed: res:', res);
	  alert(
		`Failed to login. 😢 `
	  ); */
  };

  if (clientId) {
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess} //{handleLogin}
          onFailure={onFailure} //{handleLogin}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
  
  export default LoginGoogle;
  
  