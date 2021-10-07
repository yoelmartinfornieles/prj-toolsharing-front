import axios from "axios"
import EditProduct from "./EditProduct"
import{useState} from 'react'
import {Image} from 'cloudinary-react'
import {useHistory} from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;

function Favorites(props) {
    /* const[showEditor, setShowEditor] = useState(false) */
    let history = useHistory()
    const [showPopup, setShowPopup] = useState(false)
   
    const { favorites } = props.userInfo.data
    console.log("props", props)

    const handleSubmit = (id) => {
            axios.delete(`${API_URL}/product/${id}`)
                 .then(response => console.log("PRODUCTO BORRADO", response))
                 .catch(err => console.log(err))

    }

    /* const handleClick = () => {
        setShowEditor(!showEditor)
    } */

    const handleView = (id) => {
        history.push(`/product/${id}`)
    }



    return (
        <div>
     
            <h3 className="profile-titles">My favorites:</h3>
  
        <div className="user-product-cards">
        {favorites.map(favorite => (<div>
            
        
                <div className="user-fav-card" key={favorite._id}>
                <div className="user-product-photo">
                
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={favorite.photo}/>
                </div>
                
               {/*  <div className="user-product-text">
                <p>{product.name}</p>
                </div> */}
                <div className="user-product-button">
                <button className="user-product-button-view" onClick={() => handleView(favorite._id)}>View</button>
                </div>
                </div>
                
                
                {/* {showEditor && <EditProduct product={product} />}
                {showEditor? <button onClick={handleClick}>Save</button>:<button onClick={handleClick}>Edit Product</button>} */}
              {/*   {showPopup &&
                <div className="popup-delete"> 
                <p>Are you sure you want to delete {product.name}?</p>
                    <button onClick={() => handleSubmit(product._id)}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
                } */}

              
            </div>
        ))
        }
        </div>
        </div>
  )}
  
  export default Favorites;


 