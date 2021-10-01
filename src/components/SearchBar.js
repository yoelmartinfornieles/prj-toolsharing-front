import { useState } from "react";

function SearchProduct(props) {

  const [searchLetters, setSearchLetters] = useState("");

 /* ---- APP.JS -----

  const searchProdFunc = (searchLetters) => {
   
    let newProductsList = productsList
    let filteredProducts = newProductsList.filter(food => products.name.toLowerCase().includes(searchLetters.toLowerCase()) )

    setProductsListPrint(filteredProducts);
  } */

  const handleSelect = (e) => {
    
    setSearchLetters(e.target.value);
    /* props.searchProduct(e.target.value); */
    console.log("searchLetters: ", e.target.value)
  }; 

  return (

      <form>
             <input value={searchLetters} type="text" onChange={handleSelect} placeholder="Search tool" />
             <button><img src="./search-icon.png"/></button>
      </form>
   
  );
}

export default SearchProduct;