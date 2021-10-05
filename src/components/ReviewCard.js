import {useEffect, useState} from "react"
import axios from "axios"
import stars0 from '../images/0-stars.png'
import stars1 from '../images/1-stars.png'
import stars2 from '../images/2-stars.png'
import stars3 from '../images/3-stars.png'
import stars4 from '../images/4-stars.png'
import stars5 from '../images/5-stars.png'

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
	let rate
	
	switch (reviewInfo.rating){
		case 0:
			rate = stars0
			break;
			case 1:
			rate = stars1
			break;
			case 2:
			rate = stars2
			break;
			case 3:
			rate = stars3
			break;
			case 4:
			rate = stars4
			break;
			case 5:
			rate = stars5
	}


	if (reviewInfo) {

	return (

		


		<div className="review-card">
		<div className="review-photo">
		<img src= {reviewInfo.user.profileImg} alt="Review person"></img>
		</div>
		<div className="review-text">
		<div>
		<img src={rate}/>
		</div>
		<h4>{reviewInfo.user.username}:</h4>
		<p>{review.content}</p>
		</div> 
		</div>

	);
  } else {
	  return (
		  <p>Loading ... REVIEWcard</p>
	  )
  }

}
  
export default ReviewCard;
  
