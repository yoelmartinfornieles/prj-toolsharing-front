
/* import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
import  UserInfo  from "../components/profileComponents/UserInfo"
import axios from "axios"
import UserProducts from "../components/profileComponents/UserProducts"
import AdressConverter from "../components/AdressConverter";
import {MYNETWORK} from "../utils/paths";
import Logo from "../images/tooly-logo.png";
import { GoogleLogout } from "react-google-login";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(false);
  let API_URL = process.env.REACT_APP_API_URL;

  let userId = user._id;

	const { logOutUser } = useContext(AuthContext);

  useEffect(
    () => {
      axios.get(API_URL + "/user/" + userId).then((response) => {
        console.log("response: ", response);
        setUserInfo(response);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleShow = (e) => {
    e.preventDefault();
    setShowLocationForm(!showLocationForm);
  };

  const handleUnshow = (e) => {
    e.preventDefault();

    setShowLocationForm(!showLocationForm);
  };

  if (userInfo) {
    return (
      <>
        <nav className="top-navbar">
          <img src={Logo} alt="Logo" />
        </nav>
        <div className="profile-container">
		<button onClick={logOutUser}>Logout</button>
    <GoogleLogout />
          <UserInfo userInfo={userInfo} />
         
            <UserProducts userInfo={userInfo} />
    
          {!showLocationForm && (
            <button onClick={handleShow}>Choose Location</button>
          )}
          {showLocationForm && (
            <AdressConverter id={userId} close={handleUnshow} />
          )}

          <a className="" href={MYNETWORK}>
            GO TO MY NETWORK
            <img alt="" />
          </a>
        </div>
      </>
    );
  } else {
    return <>No user information</>;
  }
}


export default ProfilePage */


import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
import  UserInfo  from "../components/profileComponents/UserInfo"
import axios from "axios"
import UserProducts from "../components/profileComponents/UserProducts"
import AdressConverter from "../components/AdressConverter";
import {MYNETWORK} from "../utils/paths";
import Logo from "../images/tooly-logo.png";
import { GoogleLogout } from "react-google-login";
import UserTransactions from '../components/profileComponents/UserTransactions'

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(false);
  let API_URL = process.env.REACT_APP_API_URL;

  let userId = user._id;

	const { logOutUser } = useContext(AuthContext);

  useEffect(
    () => {
      axios.get(API_URL + "/user/" + userId).then((response) => {
        console.log("response: ", response);
        setUserInfo(response);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleShow = (e) => {
    e.preventDefault();
    setShowLocationForm(!showLocationForm);
  };

  const handleUnshow = (e) => {
    e.preventDefault();

    setShowLocationForm(!showLocationForm);
  };

  if (userInfo) {
    return (
      <>
        <nav className="top-navbar">
          <img src={Logo} alt="Logo" />
        </nav>
        
        <div className="profile-container">
        <div className="user-info-back">
          <UserInfo userInfo={userInfo} />
         </div>
         <div className="user-products-container">
            <UserProducts userInfo={userInfo} />
            </div>
    
          {!showLocationForm && (
            <button onClick={handleShow} class="location-button">Choose Location</button>
          )}
          {showLocationForm && (
            <AdressConverter id={userId} close={handleUnshow} />
          )}
          <UserTransactions />
          

          <a className="" href={MYNETWORK}>
            GO TO MY NETWORK
            <img alt="" />
          </a>
          <div className="logout-container"></div>
          <button className="logout-button" onClick={logOutUser}>Logout</button>
          <GoogleLogout className="logout-button"/>
        </div>
      </>
    );
  } else {
    return <>No user information</>;
  }
}


export default ProfilePage