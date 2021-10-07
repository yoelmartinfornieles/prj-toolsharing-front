import axios from "axios"
import {useState, useEffect} from "react"
import ReviewForm from "./ReviewForm"

const API_URL = process.env.REACT_APP_API_URL

const UserTransactions = (props)=>{

    const[transactions, setTransactions] = useState([])
    

    const {userInfo} = props
    
    
    useEffect( 
        () =>{
            
            
            console.log("user info coming :" , typeof userInfo)
            axios.get(API_URL + "/transaction/profile/"+userInfo)
            .then(response => {setTransactions(response.data)
                console.log('transaction',response.data)
            }
            )


    } 
    ,[])

console.log("Transactions estado aqui:" , transactions)
    return(

        <>
        {
            transactions.map ( transaction =>(
                <div key={transaction._id}>

                    <h2>{transaction.product.name}</h2>
                    <p>{transaction.startDate} - {transaction.startDate}</p>
                    <p>Owner: {transaction.owner.username}</p>
                    <p>Renter: {transaction.renter.username}</p>
                    <ReviewForm productId={transaction.product._id}  userInfo={userInfo}  />
                </div>
            ))
        }
  
       </>
    ) 
}

export default UserTransactions