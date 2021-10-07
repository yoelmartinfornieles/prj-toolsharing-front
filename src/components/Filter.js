import axios from "axios";
import { useState,useContext, useEffect} from "react";
import { AuthContext } from "../context/auth.context";
import distance from "../utils/distance"
const API_URL = process.env.REACT_APP_API_URL;



function Filter (props) {
  
  const {  setProductsCopy, searchValue } = props;
  const { user } = useContext(AuthContext);
  const [searchByCategory, setSearchByCategory] = useState("assembly");
  const [searchByPrice, setSearchByPrice] = useState(50000);
  const [searchByRating, setSearchByRating] = useState(5)
  const [searchByDistance, setSearchByDistance] = useState(50)
  const [userInfo, setUserInfo] = useState("");

  let userLat,
  userLng,
  productLat,productLng = undefined

 console.log("DATOS USUARIO " ,userInfo)

 useEffect(
  () => {
    if (userInfo){
      axios.get(API_URL + "/user/" + user._id).then((response) => {
        console.log("response: ", response);
        setUserInfo(response);
      });
    }else{
      let dummyUser = {
        data: {        _id: "615f0a4b5e7a9b0016302795",
        address:{ street: "Pamplona", number: "96", city: "Barcelona",  },
        email:"tooly.project@gmail.com",
        favorites: [],
        location: { lat: "41.3979343", 
                    lng: "2.190108" },
        password: "$2a$10$y7HjulCcLJFrgD10lhLBieuP5z3aOYtwlsguVeeUEC.yC41a8PHg.",
        products:  [],
        transactions: [],
        username: "Dummy User"}
      }
      setUserInfo(dummyUser)
    }

  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []
);

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
  const handleDistance = (e) => {
  console.log("rating", e.target.value)
  setSearchByDistance(e.target.value) 
  }

  const handleSubmit = (e) => {

    console.log("hemos llegado al submit")
    e.preventDefault()
    const objectToSubmit = { 
      category: searchByCategory,
      amount: searchByPrice,
      averageRating: searchByRating,
      nameSearch: searchValue,
  
    }
    
    axios.post(API_URL+"/product/filter", objectToSubmit)
      .then(response => {
        console.log("RESPONSE FILTRADA AQUI: ", response.data)
        let firstFiltered = response.data

        
        let filteredByLocation =[]
        let distanceBetween 

        userLat= parseFloat(userInfo.data.location.lat)
        userLng= parseFloat(userInfo.data.location.lng)

        for (let filteredProduct of firstFiltered){
            productLat =  parseFloat(filteredProduct.location.lat)
            productLng =  parseFloat(filteredProduct.location.lng)

            distanceBetween = distance(userLat, userLng, productLat, productLng )
            if( distanceBetween < searchByDistance){
              filteredByLocation.push( filteredProduct)
            }
        }
        setProductsCopy(filteredByLocation)
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
              


          <input type="range" min="1" max="50" step="1" value={searchByDistance} onChange={handleDistance}
              list="tickmarks"/> 
              <label>{searchByDistance}</label>
              <datalist id="tickmarks">
                  <option value="1">1km</option>
                  <option value="2">2km</option> 
                  <option value="5">5km</option>
                  <option value="10">10km</option>
                  <option value="50">50km</option>
                  
              </datalist>
              <button type="submit">Filter</button>
    </form>
 
);
}

export default Filter



