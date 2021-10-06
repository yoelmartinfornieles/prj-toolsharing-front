import React, { useState} from "react";
import EditUserInfo from "./EditUserInfo"
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
        <h3>Información de usuario</h3>
        <div className="picture-user">
        <img src={profileImg} alt="profileImg"/>
        </div>
        <p>{username}</p>
        <p>email: {email}</p>

        {!isShowEditUserForm ? <button onClick={handleSubmitEditForm}> Edit profile </button>
                               :<button onClick={handleSubmitEditForm}> Ocultar datos </button>} 

        {isShowEditUserForm ? <EditUserInfo userInfo={userInfo}/> : <></>}


      </div>
  
  );
}

export default UserInfo;