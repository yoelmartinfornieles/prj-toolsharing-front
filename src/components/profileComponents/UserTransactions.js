import axios from "axios"
import {useState, useEffect} from "react"
import ReviewForm from "./ReviewForm"

const API_URL = process.env.REACT_APP_API_URL

const UserTransactions = ()=>{

    const[transactions, setTransactions] = useState([])
    



    useEffect( 
        () =>{
            const storedToken = localStorage.getItem('authToken');
        
            axios.get(API_URL + "/transaction",    { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then(response => {setTransactions(response.data)
                console.log('transaction',response.data)
            }
            )
       

    } 
    ,[])


    return(

       
        transactions.map(
            transaction => (
                <div className="transactionCard">

                    <h2>{transaction.product.name}</h2>
                    <p>{transaction.startDate} - {transaction.startDate}</p>
                    <p>Owner: {transaction.owner}</p>
                    <p>Renter: {transaction.Renter}</p>
                    <ReviewForm productId={transaction.product_id}  />

                

                </div>
            ))
       

    )
}

export default UserTransactions