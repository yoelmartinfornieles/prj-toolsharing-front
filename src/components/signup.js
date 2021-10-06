import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function Signup(props) {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { logInUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      username: username,
      email: email,
      password: password,
    };
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/signup`, requestBody)
      .then((response) => {
        console.log("signed up correct");
        let req = {
          email: requestBody.email,
          subject: "Welcome to Tooly",
          message: "You succesfully registered, enjoy",
        };
        axios.post(`${API_URL}/send-email`, req).then((response) => {
          console.log("email sent successfully", response.data);
          axios
            .post(`${API_URL}/login`, requestBody)
            .then((response) => {
              console.log("logged in correct");
              const token = response.data.authToken;
              logInUser(token);
              history.push("/profile");
            })
            .catch((error) => {
              console.log("error: ", error);
            })

        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div className="Signup">
      <h1>Sign Up</h1>

      <div className="scroll-signup">
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
          />

          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Signup;
