import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;


function EditUserInfo(props) {

    const history = useHistory()

    const oldUserInfo = props.userInfo
    const userId = oldUserInfo._id

    console.log("userID", userId)


  const oldFullName = oldUserInfo.fullName
  const oldUsername = oldUserInfo.username
  const oldStreet = oldUserInfo.address.street
  const oldNumberStreet = oldUserInfo.address.numberStreet
  const oldCity = oldUserInfo.address.city
  const oldPostalCode = oldUserInfo.address.postalCode
  const oldProfileImg = oldUserInfo.profileImg

  console.log("USERINFO", oldFullName )

  const [fullName, setFullName] = useState(oldFullName);
  const [username, setUsername] = useState(oldUsername);
  const [street, setStreet] = useState(oldStreet);
  const [numberStreet, setNumberStreet] = useState(oldNumberStreet);
  const [city, setCity] = useState(oldCity);
  const [postalCode, setPostalCode] = useState(oldPostalCode);
  const [profileImg, setProfileImg] = useState(oldProfileImg);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFullName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
 /*  const handleStreet = (e) => setStreet(e.target.value);
  const handleNumberStreet = (e) => setNumberStreet(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value); */
  const handleProfileImg = (e) => setProfileImg(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      fullName: fullName,
      username: username,
      /* address: {
        street: street,
        number: numberStreet,
        city: city,
        postalCode: postalCode,
      }, */
      profileImg: profileImg,
    };

    console.log(requestBody);

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .put(`${API_URL}/user/${userId}`, requestBody)
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {console.log(error); 
      });
  };

  return (
    <div className="Signup">

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
            type="file"
            name="profileImg"
            placeholder="Imagen de perfil"
            value={profileImg}
            onChange={handleProfileImg}
          />

          <button type="submit">Accept</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditUserInfo;