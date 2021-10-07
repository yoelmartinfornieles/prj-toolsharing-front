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
  var { clickToShow } = props;

  const onSuccess = (res) => {
    clickToShow();
    const googleObject = res.profileObj;
    const requestBody = {
      email: googleObject.email,
      username: googleObject.name,
      password: googleObject.googleId,
    };
    axios
      .post(API_URL+"/user/email", requestBody)
      .then((res) => {
        if (res.data === "1") {
          axios
            .post(`${API_URL}/login`, requestBody)
            .then((response) => {
              const token = response.data.authToken;
              logInUser(token);
              history.push("/profile");
            })
            .catch((error) => {
              console.log("error: " + error)
            });
        } else if (res.data === "0") {
          axios
            .post(`${API_URL}/google/signup`, requestBody)
            .then((response) => {
              let req = {
                email: requestBody.email,
                subject: "Welcome to Tooly",
                message: `Nice to meet you, ${requestBody.username}. Enjoy!`,
              };
              axios
                .post(`${API_URL}/send-email`, req)
			          .then((response) => {
                  axios
                    .post(`${API_URL}/google`, requestBody)
                    .then((response) => {
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
      console.log("error: " + error)
      });
	  refreshTokenSetup(res);
  };

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
  
  