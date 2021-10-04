import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";


function FilteredProducts(props) {

  console.log ("FILTER PROPS: ", props)

  const{setProductsByFilter, products} = props;

 /*  const allProducts = props.products */
  
  console.log ("allProducts", products.data)
  const [filteredProducts, setFilteredProducts] = useState([])

  const [searchByCategory, setSearchByCategory] = useState("assembly");
  const [searchByPrice, setSearchByPrice] = useState("10000000");
  const [searchByRating, setSearchByRating] = useState("100000000")

  console.log ("OUTERfiltered", filteredProducts)
  setProductsByFilter(filteredProducts)

 
useEffect(() => {

    const handleSelect = () => {

        const newList = products.data
        const price = parseInt(searchByPrice)
        const rating = parseInt(searchByRating)

        console.log ("entro en el if")

        let filteredCategory = newList.filter( product => product.categories.includes(searchByCategory))

        let filteredPrice = filteredCategory.filter((product => product.amount <= price))

        let finalFilter = filteredPrice.filter(product => product.avarageRating <= rating)
        

                                                /* (product => product.amount <= price

                                                 && product.reviews.rating <= parseInt(searchByRating)) ) */
                                                 
        console.log("FINALFILTER", finalFilter) 
        setFilteredProducts(finalFilter)
        console.log("FILTERED PRODUCTS: ", filteredProducts)
        console.log("filteredcategory", filteredCategory)
        console.log("filteredprice", filteredPrice)
        /* console.log("hooola", filteredPrice[0].reviews[0]) */
         console.log("categoria seleccionada", searchByCategory) 
    
    
      }; 
handleSelect()

}, [/* searchByPrice, searchByCategory, searchByRating */])

 

  

  const handleCategory = (e) => {
      setSearchByCategory(e.target.value)
  }

  const handlePrice = (e) => {
      console.log("EVENTO", e.target.value)
      setSearchByPrice(e.target.value)
  }

  const handleRating = (e) => {
    console.log("rating", e.target.value)
    setSearchByRating(e.target.value)
}


   /*  const API_URL = process.env.REACT_APP_API_URL;
    const productToSearch = searchLetters;
    console.log ("looking for =>", productToSearch) */
    //llamar a la base de datos y recoger todos los objetos
   /*  axios
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
  }                 */                  

  return (

      <form>
            <label>Category:</label>
            <select onChange={handleCategory}>
                <option value="assembly">Assembly Tools</option>
                <option value="cuting">Cuting Tools</option>
                <option value="hammering">Hammering Tools</option>
                <option value="painting">Painting Tools</option>
                <option value="clamping">Clamping Tools</option>
                <option value="gardering">Gardering Tools</option>
                <option value="measuring">Measuring Tools</option>
                <option value="vacuum cleaners">Vacuum cleaners</option>
                <option value="stairs">Stairs</option>
                <option value="industrial">Industrial Tools</option>
            </select>
            <label>Price:</label>
            <input type="range" min="0" max="300" step="5" value={searchByPrice} onChange={handlePrice}
                list="tickmarks" multiple/> 
                <label>{searchByPrice}</label>
                <datalist id="tickmarks">
                    <option value="0">0</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                    <option value="300">300</option>
                </datalist>
            <label>Rating:</label>
            <input type="range" min="0" max="5" step="1" value={searchByRating} onChange={handleRating}
                list="tickmarks"/> 
                <label>{searchByRating}</label>
                <datalist id="tickmarks">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    
                </datalist>
      </form>
   
  );
}

export default FilteredProducts;