function ChatContactCard(props) {
  let {user} = props
  console.log ("USER: ", user.profileImg);
  
  if (user.profileImg!==undefined) {
  
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

} else {
  return (
    <>
        <picture className="user-picture">
            <img src="./deafult chat img.jpeg" alt={`${user.name}`} />
        </picture>
        <div className="user-info-container">
            <div className="user-info">
                <h4>{user.username}</h4>
            </div>
        </div>
    </>
  );
}
}

export default ChatContactCard
