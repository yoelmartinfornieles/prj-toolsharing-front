import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import { useHistory } from "react-router"
import {useContext} from "react"
import { AuthContext } from "../context/auth.context";


const API_URL = process.env.REACT_APP_API_URL

const PaypalPop = (props) =>{
 const { user } = useContext(AuthContext);
 const { price, product, endDate, startDate, excludedDays } = props;
 const history = useHistory();

 let userId = user._id;

 const ProductDetails = {
   product,
   endDate,
   startDate,
   excludedDays,
   userId,
 };

 const createTransaction = () => {
   axios.post(API_URL + "/transaction", ProductDetails)
   .then((response) => {
     console.log('respuesta:',response)
     history.push("/");
   });
 };
 return (
   <div>
     <PayPalButton
       options={{
         clientId: process.env.REACT_APP_PAYPAL,
         currency: "EUR",
       }}
       amount={price}
       // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
       onSuccess={(details, data) => {
         createTransaction();

         // OPTIONAL: Call your server to save the transaction
         return fetch(API_URL + "/tortuga", {
           method: "post",
           body: JSON.stringify({}).then((response) => response),
         });
       }}
     />
   </div>
 );
}

export default PaypalPop
