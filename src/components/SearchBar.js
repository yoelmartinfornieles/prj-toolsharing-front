import { useState } from "react";
import axios from "axios";


function SearchProduct(props) {

  const {setProductsBySearch, setThereAreProducts} = props

  const [searchLetters, setSearchLetters] = useState("");

  const handleSelect = (e) => {
    
    setSearchLetters(e.target.value);
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const productToSearch = searchLetters;
    console.log ("looking for =>", productToSearch)
    //llamar a la base de datos y recoger todos los objetos
    axios
      .get (API_URL + "/product/search/"+productToSearch)
      .then (response => {
        console.log("Aquiiiiiiii: ", response.data)
        setProductsBySearch (response.data);
        setThereAreProducts (true)
      } 
        )
  }                                  

  return (

      <form onSubmit={handleSubmit}>
             <input value={searchLetters} type="text" onChange={handleSelect} placeholder="Search tool" />
             <button type="submit" ><img src="./search-logo.png" alt="Search"/></button>
      </form>
   
  );
}

export default SearchProduct;