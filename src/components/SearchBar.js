import { useState } from "react";
import axios from "axios";


function SearchProduct(props) {

  const [searchLetters, setSearchLetters] = useState("");

  const handleSelect = (e) => {
    
    setSearchLetters(e.target.value);
    /* props.searchProduct(e.target.value); */
    //console.log("searchLetters: ", e.target.value)
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const productToSearch = searchLetters;
    console.log ("looking for =>", productToSearch)
    //llamar a la base de datos y recoger todos los objetos
    axios
      .get (API_URL + "/product")
      .then (response => {
        console.log ("data: ", response.data)
        let productList = response.data;
        //filtrar el producto que queremos
        let filteredByName = productList.filter(product => product.name.toLowerCase().includes(productToSearch.toLowerCase()) )
        let filteredByDesc = productList.filter(product => product.description.toLowerCase().includes(productToSearch.toLowerCase()) )

        console.log("filtered: ", filteredByName)
        console.log("filtered: ", filteredByDesc)

      } )
      .catch((error) => console.log(error));
  }                                  

  return (

      <form onSubmit={handleSubmit}>
             <input value={searchLetters} type="text" onChange={handleSelect} placeholder="Search tool" />
             <button type="submit" ><img src="./search-logo.png" alt="Search"/></button>
      </form>
   
  );
}

export default SearchProduct;