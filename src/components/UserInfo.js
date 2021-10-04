import React from "react";
//import Signup from "./signup";
//import Login from "./login";

function UserInfo(props) {
  console.log ("tpm: ", props)
  const {username, address , email } = props.userInfo.data
  return (
    <div>
      <div>
        <p>{username}</p>
        <h3>Información de usuario</h3>
        <p>email: {email}</p>
        <p>Dirección:</p>
        <p>{address.street}</p>
        <p>{address.number}</p>
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
      </div>
    </div>
  );
}

export default UserInfo;