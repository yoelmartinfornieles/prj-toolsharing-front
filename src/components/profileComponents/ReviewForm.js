import axios from "axios";
import { useState } from "react";
const API_URL = process.env.REACT_APP_API_URL

const ReviewForm = (props)=>{

    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("1")
    const { productId, userInfo } = props;

    const handleText = (e) => {
      setReviewText(e.target.value);
    };
    const handleRating = (e) => {
      setRating(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      let objectToSubmit = {
        productId: productId,
        content: reviewText,
        rating: rating,
        user: userInfo,
      };

      axios
        .post(API_URL + "/review", objectToSubmit)
        .then((response) => console.log(response.data));
    };

    return (
      <form onSubmit={handleSubmit}>
        <textarea className="user-trans-card-input" type="text-area" value={reviewText} onChange={handleText} />

        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={rating}
          onChange={handleRating}
          list="tickmarks"
        />

        <label>{rating}</label>

        <datalist id="tickmarks">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </datalist>
        <button className="logout-button" type="submit"> Review </button>
      </form>
    );
}
export default ReviewForm