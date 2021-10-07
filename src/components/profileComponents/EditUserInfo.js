import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;


function EditUserInfo(props) {

    const setIsShowEditUserForm = props.setIsShowEditUserForm

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
  //const[fileInput,setFileInput]= useState("")
  const fileInput = ""

  const[previewSource,setPreviewSource]= useState("")

  let API_URL = process.env.REACT_APP_API_URL

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFullName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleProfileImg = (e) => setProfileImg(e.target.value);

  const handleFileChange =(e)=>{
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=() =>{
        setPreviewSource(reader.result)
    }
  }

  const handleSubmitImage = (e) => {

    e.preventDefault()
    console.log("image send")
    if(!previewSource) return;
   uploadImage(previewSource)
}

const uploadImage = async (base64EncodedImage) => {

  console.log("image uploaded")
try {
    const res = await fetch(API_URL+"/upload", {
        method: "POST",
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {"Content-type": "application/json"}
    })
    const data = await res.json()
    console.log('this is the photo madafaka',data.response)
    setProfileImg(data.response)

} catch (err){
    console.error(err)
}

}



  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      fullName: fullName,
      username: username,
      profileImg: profileImg,
    };

    console.log(requestBody);

    axios
      .put(`${API_URL}/user/${userId}`, requestBody)
      .then(() => {
        setIsShowEditUserForm(false)
        window.location.reload()
      })
      .catch((error) => {console.log(error); 
      });
  };

  return (
    <div className="Signup edit-profile">
    <div className="new-product-form">
          <form className="new-product-form-photo" onSubmit={handleSubmitImage} >
            <input multiple 
              type="file"
              name="image" 
              onChange={handleFileChange} 
              value={fileInput} />
              <button type="submit">Select Photo</button>
          </form>
          {previewSource && (
            <img src={previewSource} alt=""/>
            )}
          </div>

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

          <button type="submit">Accept</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditUserInfo;