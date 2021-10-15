import axios from "axios"
import {useState, useEffect} from "react"
import ReviewForm from "./ReviewForm"

const API_URL = process.env.REACT_APP_API_URL

const UserTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const { userInfo } = props;
  let userId = userInfo.data._id;
  useEffect(() => {
    axios.get(API_URL + "/transaction/profile/" + userId).then((response) => {
      setTransactions(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
      <h3 className="profile-titles">My Transactions:</h3>
      <div className="user-trans-cards">
        {transactions.map((transaction) => (
          <div className="user-trans-card" key={transaction._id}>
            <h2>{transaction.product.name}</h2>
            <p>
              {transaction.startDate} - {transaction.endDate}
            </p>
            <p>Owner: {transaction.owner.username}</p>
            <p>Renter: {transaction.renter.username}</p>
            <ReviewForm productId={transaction.product._id} userInfo={userId}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTransactions