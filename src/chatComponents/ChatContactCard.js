import {Image} from "cloudinary-react"

function ChatContactCard(props) {
  let {user} = props
  return (
    <>
        <picture className="user-picture">
            <Image className="user" cloudName="toolsharing" publicId={user.profileImg} alt={`${user.name}`} />
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
