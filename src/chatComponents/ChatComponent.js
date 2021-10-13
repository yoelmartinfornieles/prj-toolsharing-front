import React from "react";
import Talk from "talkjs";
import axios from "axios";

class MyNetwork extends React.Component {
  constructor(props) {
    super(props);
    let currentUser;
    const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    if (currentTalkjsUser) {
      currentUser = JSON.parse(currentTalkjsUser);
    }
    this.state = {
      currentUser,
      isLoading: true,
    };
    this.otherUsers = [];
  }

  componentDidMount() {
    const API_URL = process.env.REACT_APP_API_URL;
    const regex = /"id":"([^"]+)"/gi;
    const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    const result = regex.exec(currentTalkjsUser);
    let currentUserId = result[1];
    axios.get(API_URL + `/chat/${currentUserId}`).then((response) => {
      let transactions = response.data;
      let usersInvolved = [];

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].owner === currentUserId) {
          usersInvolved.push(transactions[i].renter);
        } else if (transactions[i].renter === currentUserId) {
          usersInvolved.push(transactions[i].owner);
        }
      }
      this.otherUsers = [...usersInvolved];
      this.setState({ ...this.state, isLoading: false });
    });
  }

  handleCloseChat(){
    let element = document.getElementById("chatbox")
    element.classList.toggle("hide")
    let elementBtn = document.getElementById("chatbox-btn")
    elementBtn.classList.toggle("hide")
  }

  handleClick(owner) {
    let element = document.getElementById("chatbox")
    element.classList.toggle("hide")
    let elementBtn = document.getElementById("chatbox-btn")
    elementBtn.classList.toggle("hide")
    let TALK_JS_DEV_ID = process.env.REACT_APP_TALK_JS_DEV_ID
    const { currentUser } = this.state;
    let user = owner;
    user.id = user._id;
    user.name = user.username;
    user.role = "Member";

    Talk.ready
      .then(() => {
        const me = new Talk.User(currentUser);
        const other = new Talk.User(user);
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: TALK_JS_DEV_ID,
            me: me,
          });
        }

        //Get a conversation ID or create one
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);

        //Set participants of the conversations
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        //Create and mount chatbox in container
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <>
        {this.state.isLoading ? null : (
          <>
            <div className="user-action">
              <button onClick={(userId) => this.handleClick(this.props.owner)}>
                Message
              </button>
            </div>

            <div
              className="chatbox-container hide"
              id = "chatbox"
              ref={(c) => (this.container = c)}
            >
              <div id="talkjs-container" style={{ height: "300px" }}>
                <i></i>
              </div>
            </div>
            <button id="chatbox-btn" className="close-button hide" onClick={this.handleCloseChat}>Close chat</button>
          </>
        )}
      </>
    );
  }
}

export default MyNetwork;
