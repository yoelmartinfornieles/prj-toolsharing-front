import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import {useParams} from "react-router-dom";
import FavButton from '../components/FavButton'
import ReviewCard from '../components/ReviewCard'
import CalendarBook from '../components/CalendarBookDetails'
import {Image} from 'cloudinary-react'

import OwnerCard from '../components/UserCard'
import Logo from "../images/tooly-logo.png"
import ChatComponent from "../chatComponents/ChatComponent"

//const API_URL = process.env.REACT_APP_API_URL;

function ProductDetailsPage (props) {
  const [product, setProduct] = useState(null)
  const [owner, setOwner] = useState (null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFav, setIsFav] = useState(false)

  console.log('product!!!!MODHEWRFUKER', product)

  const {id} = useParams()
  console.log ("id: ", id)
  console.log('is fav??',isFav)
  
  const { user } = useContext(AuthContext);
	//const [userInfo, setUserInfo] = useState ("")
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  console.log('this is the current user:', userId)

	useEffect(() => {

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
        setProduct (response.data.product)
        setOwner (response.data.user)
        setIsLoaded(true)
        console.log ("product: ", response.data)
      }
    ) 
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  const handleSubmitFav = (e) => {
    e.preventDefault()
    setIsFav(!isFav)
     
    axios
      .post (API_URL+"/fav/"+id, {userId})
      .then (response => {
          }
    ) 
  }

  const handleSubmitDeleteFav = (e) => {
    e.preventDefault()
    setIsFav(!isFav)
     
    axios
      .put (API_URL+"/fav/"+id, {userId})
      .then (response => {
       

        console.log("product delete Fav: ", response.data)
      }
    ) 
  }
  
  
  return ( <div className="product-details">
        <nav className="top-navbar">
            <img src={Logo} alt="Logo" />
        </nav>
        {isLoaded && <div>
            <div className="product-detail-card">
              <div className="product-detail-img">
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={product.photo}/>
              </div>
              <div className="product-header-text">
                <h2>{product.name}</h2>
                <FavButton handleSubmitFav={handleSubmitFav} handleSubmitDeleteFav={handleSubmitDeleteFav} isFav={isFav}/>  
              </div>
              <p>{product.description}</p>
              <OwnerCard ownerId={product.ownerId}/> 
            </div>
              <CalendarBook product={product} />
                <h2 className="review-title">Tool reviews:</h2>
                  <div className="review-cards">
                          {product.reviews.map ( (review) => { 
                          return (<ReviewCard key={review._id} review={review} />)})}
                  </div>
      <ChatComponent owner= {owner}/>
    </div>}
    </div>
  );
 
}

export default ProductDetailsPage;

