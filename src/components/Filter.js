import axios from "axios";
import { useState, useEffect , useLayoutEffect} from "react";


function Filter (props) {
  console.log ("PROPS", props)
  const {setProductsByFilter, products} = props

  const [searchByCategory, setSearchByCategory] = useState("assembly");
  const [searchByPrice, setSearchByPrice] = useState("0");
  const [searchByRating, setSearchByRating] = useState("0")

  useLayoutEffect(() => {

    const API_URL = process.env.REACT_APP_API_URL;

    if (products.length !== 0){

      let productsToFilter = products;
      let filteredProducts = []
      let filteredByCategory = []


    //IF filteredByCategory

    //llamada a axios

    /* let filteredByCategory = products.filter( product => {
    console.log ("PRODUCT.CATEGORY: "+product.categories+" = "+"SEARCHCATEGORY: "+searchByCategory)
    return product.categories.includes(searchByCategory)
    })
    console.log ("filtered by category: ", filteredByCategory) */

      let filteredByPrice = productsToFilter.filter (product => product.amount <= searchByPrice)
      let filteredByRating = productsToFilter.filter(product => product.avarageRating >= searchByRating)
      axios
        .get(API_URL+"/product/category/"+searchByCategory)
        .then ((response) => {
          console.log ("response: ", response)
          filteredByCategory = response.data;
          
          filteredProducts = [...filteredByCategory]

            console.log ("Filtered Products: ", filteredProducts)

            if (filteredByRating.length!==0){
              setProductsByFilter (filteredProducts) 
            } else {
              console.log ("nothing to show")
            }
        })
        .catch((error) => console.log(error))
      

  }

  },
  [searchByCategory, searchByPrice, searchByRating])

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

  return (

    <form>
          <label>Category:</label>
          <select onChange={handleCategory}>
              <option value="assembly">Assembly Tools</option>
              <option value="cutting">Cuting Tools</option>
              <option value="hammering">Hammering Tools</option>
              <option value="painting">Painting Tools</option>
              <option value="clamping">Clamping Tools</option>
              <option value="gardening">Gardering Tools</option>
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

export default Filter



