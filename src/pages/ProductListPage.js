import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard'


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
    <div className="cards-container">
        { 
           Products.map (product => (
          <ProductCard link={`/product/${product._id}`} img={product.photo} name={product.name} amount={product.amount}/>))

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
