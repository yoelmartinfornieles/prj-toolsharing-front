import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from 'reactjs-popup';
 
const API_URL = "http://localhost:5005";
 
 
function SignupPage(props) {

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')



  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
      e.preventDefault();
      let objectToSubmit = {username: username, password: password, email: email}

      axios
      .post(`${API_URL}/signup`, objectToSubmit)
      .then((response)=>{
          console.log (response)
          /* history.push('/products') */
      })
  }

  return(
      <div>
          <form onSubmit={handleSubmit} method="POST">
              <input placeholder = "username" type="text" name="username" value={username} onChange={handleUsername}></input>
              <input placeholder = "psswd" type="password" name="password" value={password} onChange={handlePassword}></input>
              <input placeholder = "tucorreo" type="email" name="email" value={email} onChange={handleEmail}></input>
              <button type="submit">Signup</button>           
          </form>
      </div>

  )
}
 
export default SignupPage;