import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";

function Favorites(props) {
  let history = useHistory();

  const { favorites } = props.userInfo.data;

  const handleView = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div>
      <h3 className="profile-titles">My favorites:</h3>

      <div className="user-product-cards">
        {favorites.map((favorite) => (
          <div key={favorite._id}>
            <div className="user-fav-card" key={favorite._id}>
              <div className="user-product-photo">
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={favorite.photo}
                />
              </div>

              <div className="user-product-button">
                <button
                  className="user-product-button-view"
                  onClick={() => handleView(favorite._id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
