function ChatContactCard(props) {
  let {user} = props
  console.log ("USER: ", user.username);
  return (
    <>
        <picture className="user-picture">
            <img src={user.profileImg} alt={`${user.name}`} />
        </picture>
        <div className="user-info-container">
            <div className="user-info">
                <h4>{user.username}</h4>
            </div>
        </div>
    </>
  );
}

export default ChatContactCard
