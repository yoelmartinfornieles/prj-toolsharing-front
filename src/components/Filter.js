import axios from "axios";
import { useState, useLayoutEffect} from "react";
const API_URL = process.env.REACT_APP_API_URL;


function Filter (props) {
  
  const { products, setProductsCopy, searchValue } = props;

  const [searchByCategory, setSearchByCategory] = useState("assembly");
  const [searchByPrice, setSearchByPrice] = useState(300);
  const [searchByRating, setSearchByRating] = useState(5)

  
 /*    if (products.length !== 0){

      let productsToFilter = products;
      let filteredByCategory = []
 */
     /*  console.log("SEARCH CATEGORY", searchByCategory)
      console.log("SEARCH PRICE", searchByPrice)
      console.log("SEARCH RATING", searchByRating) */

    /* let firstFilterArr = []
    let finalFilteredArr = []

      let filteredByPrice = productsToFilter.filter (product => product.amount <= searchByPrice)
      let filteredByRating = productsToFilter.filter(product => product.averageRating >= searchByRating)
      axios
        .get(API_URL+"/product/category/"+searchByCategory)
        .then ((response) => {
          //console.log ("response: ", response)
          filteredByCategory = response.data;

          for (let i = 0; i< filteredByPrice.length; i++){
              for (let j = 0; j < filteredByRating.length; j++){
                  if (filteredByPrice[i]._id === filteredByRating[j]._id){
                    firstFilterArr.push(filteredByPrice[i])
                  }
              }
          } */

        /*   for (let i = 0; i< firstFilterArr.length; i++){
            for (let j = 0; j < filteredByCategory.length; j++){
                if (firstFilterArr[i]._id === filteredByCategory[j]._id){
                  finalFilteredArr.push(firstFilterArr[i])
                }
            }
        }

        console.log("FILTEREDBYPRICE", filteredByPrice)
        console.log("FILTEREDbyRating", filteredByRating)
        console.log("FILTEREDBYcategory", filteredByCategory) */

        /* etProductsCopy(finalFilteredArr) */
       /*  setFetch(false) */

    
       /*  })
        .catch((error) => console.log(error)) */
 // }
 // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 

  const handleCategory = (e) => {
    setSearchByCategory(e.target.value)
  }

  const handlePrice = (e) => {
    setSearchByPrice(e.target.value)
  }

  const handleRating = (e) => {
  setSearchByRating(e.target.value) 
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    const objectToSubmit = { 
      category: searchByCategory,
      amount: searchByPrice,
      averageRating: searchByRating,
      nameSearch: searchValue
    }
    
    axios.post(API_URL+"/product/filter", objectToSubmit)
      .then(response => {
        setProductsCopy(response.data)
      })

  }

  return (

    <form onSubmit={handleSubmit}>
          <label>Category:</label>
          <select value={searchByCategory} onChange={handleCategory}>
              <option value="assembly">Assembly Tools</option>
              <option value="cutting">Cutting Tools</option>
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
          <input type="range" min="0" max="600" step="5" value={searchByPrice} onChange={handlePrice}
              list="tickmarks" multiple/> 
              <label>{searchByPrice}</label>
              <datalist id="tickmarks">
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                  <option value="120">120</option>
                  <option value="550">550</option>
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
              <button type="submit">Filter</button>
    </form>
 
);
}

export default Filter



