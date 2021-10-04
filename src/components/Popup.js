import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      {isShowLogin && <Login />}
      {!isShowLogin && <Signup />}

      <button className="popup-button" onClick={toggleShowLogin}>
        {isShowLogin
          ? "Aún no tienes cuenta? registrate" 
          : "Ya tienes cuenta? Inicia sessión"}
      </button>
    </div>
    </div>
  );
}

export default Popup;
