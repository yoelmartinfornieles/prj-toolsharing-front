import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


function Signup(props) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFullName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleNumberStreet = (e) => setNumberStreet(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleProfileImg = (e) => setProfileImg(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      address: {
        street: street,
        number: numberStreet,
        city: city,
        postalCode: postalCode,
      },
      profileImg: profileImg,
    };

    console.log(requestBody);

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/signup`, requestBody)
      .then((response) => props.history.push("/profile"))
      .catch((error) => {
         const errorDescription = error.response.data.message;
         setErrorMessage(errorDescription); 
      });
  };

  return (
    <div className="Signup">
      <h1>Sign Up</h1>

      <div className="scroll-signup">
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullName}
          />

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
            placeholder="eMail"
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

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={street}
            onChange={handleStreet}
          />

          <input
            type="text"
            name="numberStreet"
            placeholder="Number"
            value={numberStreet}
            onChange={handleNumberStreet}
          />

          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            onChange={handleCity}
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={handlePostalCode}
          />

          <input
            type="file"
            name="profileImg"
            placeholder="Imagen de perfil"
            value={profileImg}
            onChange={handleProfileImg}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Signup;