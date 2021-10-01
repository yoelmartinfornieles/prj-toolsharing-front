import React from "react";
import axios from "axios";
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import  UserInfo  from "../components/UserInfo"

function Login () {

   const { isLoggedIn, user } = useContext(AuthContext);
   const [userInfo, setUserInfo] = useState ("")
   let API_URL = process.env.REACT_APP_API_URL
   let userId = user._id


useEffect(() => {
	console.log("user: ", user)
	console.log("useEffect")
	axios
	 .get (API_URL+"/user/"+userId)
	 .then ((response)=> {
		console.log ("response: ", response)
		setUserInfo(response)
	 }
	)
}, 
[])

return (
	<nav>
		{userInfo.username}
	</nav>
)

}

export default Login 
/* class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            description: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name] : target.value
        })
    }


    handleSubmit(event) {


        event.preventDefault();
        const { name, email, description } = this.state;

        Generate random number that will be serve as the ID of the user
        const randomNum  = Math.ceil(Math.random() * 10000);
        const userData = {
            name,
            email,
            description,
            id: randomNum,
            role: "Member",
            photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
        }

        Store user data in browser's local storage
        localStorage.setItem("currentTalkjsUser", JSON.stringify(userData))
        Redirect to the my network page
        this.props.history.push("/mynetwork");
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text"
                          name="name"
                          onChange={this.handleChange}
                          placeholder="Name"
                          className="input" 
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          placeholder="Email"
                          className="input"
                          required
                        />
                        <textarea type="text"
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Short Description"
                          className="input textarea">
                        </textarea>
                        <input type="submit"
                          className="button" 
                          placeholder="submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}
*/