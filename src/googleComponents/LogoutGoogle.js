import React from 'react';
import { GoogleLogout } from 'react-google-login';

function Logout() {
  const onSuccess = () => {
/*     console.log('Logout made successfully');
    alert('Logout made successfully ✌'); */
  };
  
  const clientId = process.env.REACT_APP_GOOGLE_ID

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      >
      </GoogleLogout>
    </div>
  );
}

export default Logout;
