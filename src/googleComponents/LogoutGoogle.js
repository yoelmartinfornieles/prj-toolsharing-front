import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {useHistory} from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import { useContext} from "react"


function Logout() {
  let history = useHistory();
  const clientId = process.env.REACT_APP_LOGIN_GOOGLE;
  const { logOutUser } = useContext(AuthContext);

  const onSuccess = (response) => {
/*     console.log("Logged out")
    alert("Logged out")
  logOutUser()
  history.push("/") */
  };
  
  if (clientId) {
    return (
      <div>
        <GoogleLogout
          onClick = {() => {logOutUser()
            history.push("/")
            }}
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        ></GoogleLogout>
      </div>
    );
  } else {
    return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  }
}

export default Logout;
