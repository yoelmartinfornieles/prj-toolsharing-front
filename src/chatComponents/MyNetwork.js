import React from 'react';
import Talk from "talkjs";
import axios from "axios"
//import { useState } from "react"

class MyNetwork extends React.Component {
	constructor(props) {
        super(props); 
        let currentUser;
        const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
        if (currentTalkjsUser) {
            currentUser = JSON.parse(currentTalkjsUser)
        }
        this.state = {
            currentUser, 
			isLoading : true
        }
		this.otherUsers = []
   }

   componentDidMount () {
	const API_URL = process.env.REACT_APP_API_URL;
	const regex = /"id":"([^"]+)"/ig
	const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
	const result = regex.exec(currentTalkjsUser)
	console.log ("result: ",result[1])
	let currentUserId = result[1]
	console.log("currentUserId: ", currentUserId)
	axios
		.get (API_URL+`/chat/${currentUserId}`)
		.then((response) => {
			let transactions = response.data
			console.log ("transactions")
			let usersInvolved = []
			for (let i=0; i<transactions.length; i++){
				if (transactions[i].ownerId._id === currentUserId){
					console.log (transactions[i].renterId._id+" = "+currentUserId)
					usersInvolved.push(transactions[i].renterId)
				} else if (transactions[i].renterId._id === currentUserId) {
					usersInvolved.push(transactions[i].ownerId)
				}
			}
			console.log("usersInvolved: ", usersInvolved)
			this.otherUsers = [...new Set(usersInvolved)] 
			console.log ("otherUsers:", this.otherUsers)
			this.setState ({...this.state, isLoading: false})
		})
   }

   handleClick(userId) {

	let TALK_JS_DEV_ID= "teiWhWmj"//process.env.TALK_JS_DEV_ID
	console.log ("/* ------------TALK_JS_DEV_ID-----------------------*", TALK_JS_DEV_ID)

	//retrieve the two users that will participate in the conversation 
	const { currentUser } = this.state;
	
	//const user = dummyUsers.find(user => user.id === userId)
	let user = this.otherUsers.find(user => user._id === userId)
	user.id = user._id
	user.name = user.username
	user.role = "Member"

	console.log("USER: ", user)


	//Session initialization code 
	Talk.ready
	.then(() => {
		//Create the two users that will participate in the conversation 
		const me = new Talk.User(currentUser);
		const other = new Talk.User(user)

		//Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard 
		if (!window.talkSession) {
			window.talkSession = new Talk.Session({
				appId: TALK_JS_DEV_ID,
				me: me
			});
		} 
		
		//Get a conversation ID or create one 
		const conversationId = Talk.oneOnOneId(me, other);
		const conversation = window.talkSession.getOrCreateConversation(conversationId);
		
		//Set participants of the conversations 
		conversation.setParticipant(me);
		conversation.setParticipant(other);

		//Create and mount chatbox in container 
		this.chatbox = window.talkSession.createChatbox(conversation);
		this.chatbox.mount(this.container);
	})            
	.catch(e => console.error(e));
}

   render() {
	const { currentUser } = this.state;
	return (
		<div className="users">
			<div className="current-user-container">
				{currentUser &&
					<div>
						<picture className="current-user-picture">
							<img alt={currentUser.name} src={currentUser.photoUrl} />
						</picture>
						<div className="current-user-info">
							<h3>{currentUser.name}</h3>
							<p>{currentUser.description}</p>
						</div>
					</div>
				}
			</div>
                {this.state.isLoading ? null :
				 <div className="users-container"> 
                    <ul>
					{console.log("hey: ", this.otherUsers)}
                        { this.otherUsers.map(user => 
                          <li key={user.id} className="user">
                              <picture className="user-picture">
                                  <img src={user.profileImg} alt={`${user.username}`} />
                              </picture>
                              <div className="user-info-container">
                                  <div className="user-info">
                                      <h4>{user.username}</h4>
                                      <p>{user.email}</p>
                                  </div>
                                  <div className="user-action">
        							 <button onClick={(userId) => this.handleClick(user._id)}>Message</button>
      							</div>
                              </div>
                          </li>
                        )}
                        </ul>
					<div className="chatbox-container" ref={c => this.container = c}>
						<div id="talkjs-container" style={{height: "300px"}}><i></i></div>
					</div>
				</div>}
            </div>
        )
    }
}

export default MyNetwork;
