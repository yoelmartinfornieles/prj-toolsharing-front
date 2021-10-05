import React from 'react';
import { GoogleLogout } from 'react-google-login';

function Logout() {
  const onSuccess = () => {
/*     console.log('Logout made successfully');
    alert('Logout made successfully ✌'); */
  };
  
  const clientId = "103678780845-vsp1r3hrboarvi7ccaqilouat5kaf9mr.apps.googleusercontent.com"//process.env.GOOGLE_ID

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
