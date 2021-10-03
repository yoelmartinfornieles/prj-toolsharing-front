import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FavButton from '../components/FavButton'
import ReviewCard from '../components/ReviewCard'

//const API_URL = process.env.REACT_APP_API_URL;

function ProductDetailsPage (props) {
  const [product, setProduct] = useState(null)
  const [isFav, setIsFav] = useState(false)
  const {id} = useParams()
  console.log ("id: ", id)
  console.log('is fav??',isFav)
  
  const { user } = useContext(AuthContext);
	//const [userInfo, setUserInfo] = useState ("")
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  console.log('this is the current user:', userId)

	useEffect(() => {
		console.log("useEffect")
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			console.log ("response111: ", response.data.favorites)
			//setUserInfo(response)
      if(response.data.favorites.includes(id)){
        setIsFav(true)
        console.log('lo tengo!')
      }
		 }
		)
	}, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
	[])

  /* ------------GET THE CURRENT PRODUCT DATA----------------------*/ 

  useEffect(() => {

    axios
      .get (API_URL+"/product/"+id)
      .then (response => {
        setProduct (response.data)
        console.log ("product: ", response.data)
      }
    ) 
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  const handleSubmitFav = (e) => {
    e.preventDefault()
     
    axios
      .post (API_URL+"/fav/"+id, {userId})
      .then (response => {
        setIsFav(true)

        console.log("product Fav: ", response.data)
      }
    ) 

  }

  const handleSubmitDeleteFav = (e) => {
    e.preventDefault()
     
    axios
      .put (API_URL+"/fav/"+id, {userId})
      .then (response => {
        setIsFav(false)

        console.log("product delete Fav: ", response.data)
      }
    ) 

  }
  
  if (product) {
  
  return (
    <>
        <h1>PRODUCT DETAILS</h1>
        <FavButton handleSubmitFav={handleSubmitFav} handleSubmitDeleteFav={handleSubmitDeleteFav} isFav={isFav}/>
   
      <p>{product.name}</p>

      { /* ------------TODO: UserCard----------------------*/ }
      {/* <UserCard owner={product.ownerId}/> */}

      {product.reviews.map ( (review) => { 
            return (
              <ReviewCard key={review._id} review={review} />
            )
      })}
      <Link to={`/product/${product._id}/book`}>BOOK THIS</Link>
    </>
  );
  }

  else {
    return (
      <p>Loading ...</p>
    )
  }
}

export default ProductDetailsPage;

