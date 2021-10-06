import React from 'react';
import Talk from "talkjs";
import axios from "axios"
import ChatContactCard from "./ChatContactCard"

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
	let currentUserId = result[1]
	axios
		.get (API_URL+`/chat/${currentUserId}`)
		.then((response) => {
			let transactions = response.data
			let usersInvolved = []
			for (let i=0; i<transactions.length; i++){
				if (transactions[i].ownerId._id === currentUserId){
					console.log (transactions[i].renterId._id+" = "+currentUserId)
					usersInvolved.push(transactions[i].renterId)
				} else if (transactions[i].renterId._id === currentUserId) {
					usersInvolved.push(transactions[i].ownerId)
				}
			}
			let uniqueUsers = []
			let repeated
			for (let i=0; i<usersInvolved.length; i++) {
				for (let j = 0; j < uniqueUsers.length; j++) {
					if (usersInvolved[i]._id === uniqueUsers[j]._id){
						repeated=true;
					}
				}
				if (!repeated) {
					uniqueUsers.push (usersInvolved[i])
				}
				repeated = false;
			}
			console.log("UNIQUE: ", uniqueUsers)
			this.otherUsers = [...uniqueUsers] 
			console.log ("OTHERUSERS:", this.otherUsers)
			this.setState ({...this.state, isLoading: false})
		})
   }

   handleClick(userId) {

    let TALK_JS_DEV_ID = process.env.REACT_APP_TALK_JS_DEV_ID
	const { currentUser } = this.state;
	let user = this.otherUsers.find(user => user._id === userId)
	user.id = user._id
	user.name = user.username
	user.role = "Member"

	Talk.ready
	.then(() => {
		const me = new Talk.User(currentUser);
		const other = new Talk.User(user)

		if (!window.talkSession) {
			window.talkSession = new Talk.Session({
				appId: TALK_JS_DEV_ID,
				me: me
			});
		} 
		
		const conversationId = Talk.oneOnOneId(me, other);
		const conversation = window.talkSession.getOrCreateConversation(conversationId);
		
		conversation.setParticipant(me);
		conversation.setParticipant(other);

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
						<div className="current-user-info">
							<h3>{currentUser.name}</h3>
						</div>
					</div>
				}
			</div>
                {this.state.isLoading ? null :
				 <div className="users-container"> 
     
                        { this.otherUsers.map(user => 
                         <>
                              <ChatContactCard className="user" user={user} key={user.id} />
                                  <div className="user-action">
        							 <button onClick={(userId) => this.handleClick(user._id)}>Message</button>
      							</div>
                         </>
                        )}
					<div className="chatbox-container" ref={c => this.container = c}>
						<div id="talkjs-container" style={{height: "300px"}}><i></i></div>
					</div>
				</div>}
            </div>
        )
    }
}

export default MyNetwork;
