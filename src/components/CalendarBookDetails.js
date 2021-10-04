import { useState } from "react";
import {useEffect} from 'react'
import Calendar from "./Calendar.js";
import moment from "moment";

import PaypalPop from "./paypalPop"
//Test para pruebas

/* const dataArray = [
  "10/04/2021",
  "10/05/2021",
  "10/06/2021",
  "10/07/2021",
  "10/20/2021",
  "10/21/2021",
  "10/24/2021",
  "10/25/2021",
];
 */
function BookForm(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);

  const {product} = props

  console.log('paypal:',process.env.REACT_APP_JORDI)


  const[showPay, setShowPay] = useState(false) // <--- STORES SHOWING/HIDING PAYING INFO STATE ----> 
 


  const payInfoHandler= ()=>{   // <--- SWITCHES SHOWING/HIDING PAYING INFO----> 
    setShowPay(!showPay)
    console.log(showPay)
  }



  const dateArrayToPrint = (arr) =>{
    let newArr = []
    for(let elem of arr){
        newArr.push(new Date(elem))
    }
    return newArr
  }

  let dataPrint = new Date(moment(startDate).format("MM/DD/YYYY"));

  console.log("startDate:", dataPrint);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const totalDays = (startDate, endDate) => {
    let actualDay = startDate;
    let totalDateArray = [];
    while (actualDay.isSameOrBefore(endDate)) {
      totalDateArray.push(moment(actualDay).format("MM/DD/YYYY"));
      actualDay.add(1, "days");
    }
    return totalDateArray;
  };

  useEffect(()=>{
      let firstDay = moment.utc(startDate);
      let lastDay = moment.utc(endDate);
      let daysToCalc = totalDays(firstDay,lastDay)
      let priceXDay = product.amount
      setPrice(Math.round((priceXDay*daysToCalc.length)*100)/100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[endDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    let firstDay = moment.utc(startDate);
    let lastDay = moment.utc(endDate);

    const finalDateArray = totalDays(firstDay, lastDay);
   
    let newFinalArr = finalDateArray.filter ((element) => product.bookDates.includes ( element ))

/*     

      finalDateArray.map((result) => {
      if (dataArray.includes(result)) {
        newFinalArr.push(result)
      } return ("ok")
    }) */
 
    console.log('El que volem!!!:',newFinalArr)

    if (newFinalArr.length > 0) {
      setError(!error);
    } else {
      let objectToSubmit = {
        startDate: startDate,
        endDate: endDate,
        booking: finalDateArray,
      };

      console.log(objectToSubmit);
    }
    /* axios
        .post(`${API_URL}/new-product`, objectToSubmit)
        .then((result)=>{
           console.log(result)
        }) */
  };

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <Calendar
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDays={dateArrayToPrint(product.bookDates)}
      />
      <button type="submit" onClick={payInfoHandler}>Book</button>
      <h1>Total: {price}€</h1>
      {error && <h1>Please select available dates</h1>}
      
    </form>
    {showPay && 
        <PaypalPop price ={price}  />
   
    }
    
    </div>
  );
}

export default BookForm;
