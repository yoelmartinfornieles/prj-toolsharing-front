import React, { useState} from "react";
import {Link} from "react-router-dom"
import EditUserInfo from "./EditUserInfo"
//import Signup from "./signup";
//import Login from "./login";

function UserInfo(props) {


  const userInfo = props.userInfo.data
  const {username, address , email } = props.userInfo.data

  const [isShowEditUserForm, setIsShowEditUserForm] = useState(false)

  const handleSubmitEditForm = () => {

      setIsShowEditUserForm(!isShowEditUserForm)

  }


  return (
    <div>
      <div>
        <h3>Información de usuario</h3>
        <img src="https://images.vexels.com/media/users/3/137047/isolated/lists/5831a17a290077c646a48c4db78a81bb-icono-de-perfil-de-usuario-azul.png" alt="profileImg"/>
        <p>{username}</p>
        <p>email: {email}</p>

        {!isShowEditUserForm ? <button onClick={handleSubmitEditForm}> Edit profile </button>
                               :<button onClick={handleSubmitEditForm}> Ocultar datos </button>} 

        {isShowEditUserForm ? <EditUserInfo userInfo={userInfo}/> : <></>}


      </div>
    </div>
  );
}

export default UserInfo;