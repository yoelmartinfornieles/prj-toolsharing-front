import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {useHistory} from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import { useContext} from "react"


function Logout() {
  let history = useHistory();
  

  const onSuccess = (response) => {
    alert("Logged out")
  logOutUser()
  history.push("/")
  };
  
  const clientId = process.env.REACT_APP_LOGIN_GOOGLE;
  const { logOutUser } = useContext(AuthContext);

  if (clientId) {
    return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        ></GoogleLogout>
      </div>
    );
  } else {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  }
}

export default Logout;
