import React, { useState } from "react";
import Signup from "./signup";
import Login from "./login";

function Popup(props) {

  var {clickToShow} = props
  
  const [isShowLogin, setIsShowLogin] = useState(true);

  function toggleShowLogin() {
    setIsShowLogin(!isShowLogin);
  }

  return (
    <div className="popup-div">
    <div className="popup">
      <button className="close-button" onClick={clickToShow}><h1>✖</h1></button>
      {isShowLogin && <Login clickToShow={clickToShow} setIsShowLogin={setIsShowLogin}/>}
      {!isShowLogin && <Signup />}

      <button className="popup-button" onClick={toggleShowLogin}>
        {isShowLogin
          ? "You don´t have an account? Register with us!" 
          : "Login"}
      </button>
    </div>
    </div>
  );
}

export default Popup;
