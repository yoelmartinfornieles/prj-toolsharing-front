function ChatContactCard(props) {
  let {user} = props
  console.log ("USER: ", user.username);
  return (
    <div >
        <div >
          <img src={user.profileImg} alt=""/>
        </div>
        <div>
        <h2>{user.username}</h2>
        </div>
    </div>
  );
}

export default ChatContactCard
