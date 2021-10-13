import axios from "axios";
import { useState } from "react";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function UserProduct(props) {
  let history = useHistory();
  const [showPopup, setShowPopup] = useState(false);

  const { products } = props.userInfo.data;

  const handleSubmit = (id) => {
    axios
      .delete(`${API_URL}/product/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));
  };

  const handleView = (id) => {
    history.push(`/product/${id}`);
  };

  const handleShowPopup = (e) => {
    setShowPopup(true);
  };

  const handleCancelDelete = (e) => {
    setShowPopup(false);
  };

  return (
    <div>
      <h3 className="profile-titles">My products:</h3>

      <div className="user-product-cards">
        {products.map((product) => (
          <div key={product._id}>
            <div className="user-product-card" key={product._id}>
              <div className="user-product-photo">
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={product.photo}
                />
              </div>
              <div className="user-product-button">
                <button
                  className="user-product-button-view"
                  onClick={() => handleView(product._id)}
                >
                  View
                </button>
                <button
                  className="user-product-button-delete"
                  onClick={handleShowPopup}
                >
                  Delete
                </button>
              </div>
            </div>
            {showPopup && (
              <div className="popup-delete">
                <p>Are you sure you want to delete {product.name}?</p>
                <button onClick={() => handleSubmit(product._id)}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProduct;
