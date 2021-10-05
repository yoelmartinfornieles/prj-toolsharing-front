
//import { useEffect, useRef } from "react"

import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import { useHistory } from "react-router"


const API_URL = process.env.REACT_APP_API_URL




const PaypalPop = (props) =>{

 const {price, product, endDate, startDate} = props
 const history = useHistory()

const ProductDetails ={
    product,
    endDate,
    startDate
}


const createTransaction = ()=>{
    const storedToken = localStorage.getItem('authToken');
    


    console.log("Create transaction")
axios.post(API_URL + "/transaction", ProductDetails,   { headers: { Authorization: `Bearer ${storedToken}` } }  )
.then(history.push("/profile"))
}


    return(
    <div>
         <PayPalButton
        options={{
          clientId: process.env.REACT_APP_PAYPAL,
          currency:"EUR"

        }}
        amount={price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          createTransaction()
          alert("Transaction completed by " + details.payer.name.given_name);

          
          // OPTIONAL: Call your server to save the transaction
          return fetch("/transaction", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
    </div>
       
           
    )
}

export default PaypalPop