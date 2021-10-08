import { useState } from "react";
import {useEffect} from 'react'
import Calendar from "./Calendar.js";
import moment from "moment";

import PaypalPop from "./paypalPop"

function BookForm(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);
  const [finalDateArray, setFinalDateArray] = useState([])
  const {product} = props
  const[showPay, setShowPay] = useState(false) // <--- STORES SHOWING/HIDING PAYING INFO STATE ----> 
 
  const payInfoHandler= ()=>{   // <--- SWITCHES SHOWING/HIDING PAYING INFO----> 
    setShowPay(!showPay)
  }

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

    const finalDateArray2 = totalDays(firstDay, lastDay);
    let newFinalArr = finalDateArray2.filter ((element) => product.bookDates.includes ( element ))
    
    if (newFinalArr.length > 0) {
      setError(!error);
    } else {
      
      setFinalDateArray(finalDateArray2)
      };
      
    }

  let printArr = []

  printArr = product.bookDates.map((date)=>{ return new Date(date)})

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <Calendar
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDays={printArr}
      />
      <button className="book-button" type="submit" onClick={payInfoHandler}><h1>Book for {price}€</h1></button>
      {error && <div className="err-dates"><h3>Please select available dates</h3></div>}
      
    </form>
    {showPay && !error &&
        <PaypalPop price ={price}  product={product} startDate={startDate} endDate={endDate} excludedDays={finalDateArray}/>
   
    }
    
    </div>
  );
}

export default BookForm;
