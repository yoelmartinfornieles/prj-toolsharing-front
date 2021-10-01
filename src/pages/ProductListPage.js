import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Image} from "cloudinary-react"


const API_URL = process.env.REACT_APP_API_URL;

function ProductListPage() {

  const [Products, setProducts] = useState ([]);

  useEffect(() => {
    axios
      .get (API_URL + "/product")
      .then (response => {
        console.log ("data: ", response.data)
        setProducts (response.data)
      } )
      .catch((error) => console.log(error));
    }, 
    [])
  
if (Products) {

  return(
    <div>
        { 
           Products.map (product => (

          <div key={product._id} className="product-card">


            <Image
            cloudName ="toolsharing"
            publicId={product.photo}
            />
            <p>{product.name}</p>  
            <p>{product.amount}</p>
            <Link to={`/product/${product._id}`} >SEE MORE IN THE STREET</Link>
          </div>
        ))
      }
    </div>
  )
} else {
  return (
    <p>Aupa equipo</p>
  )
}

}

export default ProductListPage;

/* 




  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
      `${API_URL}/products`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProducts();
  }, [] );

  
  return (
    <div className="ProductListPage">
      
      <AddProject refreshProducts={getAllProducts} />
      
      { products?.map((project) => <ProductCard key={project._id} {...project} />  )} 
       
    </div>
  );
}

export default ProductListPage;
 */
