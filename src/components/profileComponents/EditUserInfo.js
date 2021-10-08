import { useState } from "react";
import axios from "axios";

function EditUserInfo(props) {
  const setIsShowEditUserForm = props.setIsShowEditUserForm;

  const oldUserInfo = props.userInfo;
  const userId = oldUserInfo._id;

  const oldFullName = oldUserInfo.fullName;
  const oldUsername = oldUserInfo.username;
  const oldProfileImg = oldUserInfo.profileImg;

  const [fullName, setFullName] = useState(oldFullName);
  const [username, setUsername] = useState(oldUsername);
  const [profileImg, setProfileImg] = useState(oldProfileImg);
  const fileInput = "";

  const [previewSource, setPreviewSource] = useState("");

  let API_URL = process.env.REACT_APP_API_URL;

  const [isCheck, setIsCheck] = useState(false);
  const [isImgErr, setIsImgErr] = useState(false);

  const handleFullName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch(API_URL + "/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      setProfileImg(data.response);
      setIsCheck(true);
      setIsImgErr(false);
    } catch (err) {
      setIsImgErr(true);
      console.error(err);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      fullName: fullName,
      username: username,
      profileImg: profileImg,
    };

    axios
      .put(`${API_URL}/user/${userId}`, requestBody)
      .then(() => {
        setIsShowEditUserForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-profile">
      {!isCheck && (
        <div className="new-product-form">
          <form className="new-product-form-photo" onSubmit={handleSubmitImage}>
            <input
              multiple
              type="file"
              name="image"
              onChange={handleFileChange}
              value={fileInput}
            />
            <button type="submit">Select Photo</button>
          </form>
          {previewSource && <img src={previewSource} alt="" />}
        </div>
      )}

      {isCheck && (
        <div className="upload-succes">
          <h4> Upload successful</h4>
        </div>
      )}
      {isImgErr && (
        <div className="img-error">
          <h4>Not valid image</h4>
        </div>
      )}

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

    </div>
  );
}

export default EditUserInfo;