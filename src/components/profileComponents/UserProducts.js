import axios from "axios"
import EditProduct from "./EditProduct"
import{useState} from 'react'
import {Image} from 'cloudinary-react'

const API_URL = process.env.REACT_APP_API_URL;

function UserProduct(props) {
    const[showEditor, setShowEditor] = useState(false)
   
    const { products } = props.userInfo.data
    console.log("USERPRODUCT", products)

    const handleSubmit = (id) => {
            axios.delete(`${API_URL}/product/${id}`)
                 .then(response => console.log("PRODUCTO BORRADO", response))
                 .catch(err => console.log(err))

    }

    const handleClick = () => {
        setShowEditor(!showEditor)
    }

    return (
        <div>
        <div>
            <h3>PRODUCTS</h3>
        </div>
        <div className="review-cards">
        {products.map(product => (<div>
            {!showEditor && 
        
                <div className="review-card" key={product._id}>
                <div className="review-photo">
                
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={product.photo}/>
                </div>
                
                <div className="review-text">
                <p>{product.name}</p>
                <p>{product.amount}€/day</p>
                <p>{product.adquisitionYear}</p>
                </div>
                </div>
                
                }
                {showEditor && <EditProduct product={product} />}
                {showEditor? <button onClick={handleClick}>Save</button>:<button onClick={handleClick}>Edit Product</button>}
                <button onClick={() => handleSubmit(product._id)}>Borrar producto</button>

              
            </div>
        ))
        }
        </div>
        </div>
  )}
  
  export default UserProduct;


 