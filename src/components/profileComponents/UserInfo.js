import React, { useState} from "react";
import EditUserInfo from "./EditUserInfo"
import {Image} from 'cloudinary-react'
//import Signup from "./signup";
//import Login from "./login";

function UserInfo(props) {

  const userInfo = props.userInfo.data
  const {username, email, profileImg } = props.userInfo.data

  const [isShowEditUserForm, setIsShowEditUserForm] = useState(false)

  const handleSubmitEditForm = () => {

      setIsShowEditUserForm(!isShowEditUserForm)
  

  }


  return (

      <div className="user-info">
        <div className="picture-user">
        <Image
        className="picutre-user-img"
        cloudName="toolsharing"
        publicId={profileImg}
        />
        </div>
        <div className="text-user">
        <h3>{username}</h3>

        {!isShowEditUserForm ? <button onClick={handleSubmitEditForm} className="edit-user-button"> Edit profile </button>
                               :<button onClick={handleSubmitEditForm} className="edit-user-button"> Save</button>} 

        </div>
        {isShowEditUserForm ? <EditUserInfo userInfo={userInfo} setIsShowEditUserForm={setIsShowEditUserForm}/> : <></>}


      </div>
  
  );
}

export default UserInfo;