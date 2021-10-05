import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from '../components/ProductCard'
/* import {Image} from "cloudinary-react" */
//import ProductCard from '../components/ProductCard'
import FilteredProduct from "../components/Filter"

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

  const handleSearch = (filteredProduct) => {
      setProducts(filteredProduct)
      console.log("products filtrado barra busqueda", Products)
      

  }


  
  
if (Products) {
  

  return (
    <>
      <nav className="top-navbar">
        <img src="./tooly-logo.png" alt=""/>
      </nav>
      <div>
        <FilteredProduct handleSearch={handleSearch} />
      </div>

      <div className="cards-container">
        {Products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
} else {
  return (
    <p>Loading ...productlist</p>
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
