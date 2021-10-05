//import { useEffect, useRef } from "react"
import { PayPalButton } from "react-paypal-button-v2"




const PaypalPop = (props) =>{
 const {price} = props



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
          alert("Transaction completed by " + details.payer.name.given_name);

          
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
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