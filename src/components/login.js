import { useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
//import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import LoginGoogle from "../googleComponents/LoginGoogle"
import LogoutGoogle from "../googleComponents/LogoutGoogle"

const API_URL = process.env.REACT_APP_API_URL;

console.log(API_URL)
function LoginPage(props) {

  var {clickToShow} = props
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { logInUser } = useContext(AuthContext);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/login`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
/*         setTimeout(() => {
          loginChat ()
        }, 800); */
        history.push("/profile");
      })
      .catch((error) => {
        setErrorMessage(error);
      	console.log(error)
    	})
  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <LoginGoogle clickToShow={clickToShow}/>

      <form onSubmit={handleLoginSubmit}>
        
        {/* <label>Username:</label> */}
        <input type="text" name="email" placeholder="email" value={email} onChange={handleEmail} />

        {/* <label>Password:</label> */}
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword} />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default LoginPage;