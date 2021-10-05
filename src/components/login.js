import { useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
//import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import LoginGoogle from "../googleComponents/LoginGoogle"
import LogoutGoogle from "../googleComponents/LogoutGoogle"

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser, loginChat } = useContext(AuthContext);
 
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios.post(`${API_URL}/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        const token = response.data.authToken;
        logInUser(token);
        setTimeout(() => {
          loginChat ()
        }, 500);
        history.push("/profile");
      })
      .catch((error) => {
      	const errorDescription = error.data;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <LoginGoogle/>
      <LogoutGoogle/>

      <form onSubmit={handleLoginSubmit}>
        
        {/* <label>Username:</label> */}
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsername} />

        {/* <label>Password:</label> */}
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword} />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default LoginPage;