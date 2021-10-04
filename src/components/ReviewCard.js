import {useEffect, useState} from "react"
import axios from "axios"

function ReviewCard(props) {
	let {review} = props;
	let reviewId = review._id;
	const [reviewInfo, setReviewInfo] = useState("")

	useEffect(() => {
		let API_URL = process.env.REACT_APP_API_URL
		axios
		.get(API_URL+"/review/"+reviewId)
		.then ((response) => {
			let currentReview = response.data;
			setReviewInfo (currentReview);		
		})
	},
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[])
	
	if (reviewInfo) {

	return (
		<div>
		<p>{review.content}</p>
		<p>{reviewInfo.rating}</p>
		<p>{reviewInfo.user.username}</p> 
		<img src= {reviewInfo.user.profileImg} alt="Review person"></img>
		</div>
	);
  } else {
	  return (
		  <p>Loading ... REVIEWcard</p>
	  )
  }

}
  
export default ReviewCard;
  
