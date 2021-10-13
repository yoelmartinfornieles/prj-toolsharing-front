import { useState } from "react";
import {useEffect} from 'react'
import Calendar from "./Calendar.js";
import moment from "moment";

import PaypalPop from "./paypalPop"

function BookForm(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);
  const [finalDateArray, setFinalDateArray] = useState([])
  const {product} = props
  const [showPay, setShowPay] = useState(false) // <--- STORES SHOWING/HIDING PAYING INFO STATE ----> 
  const [showCalendar, setShowCalendar] = useState(true)
 

  
  const payInfoHandler= ()=>{   // <--- SWITCHES SHOWING/HIDING PAYING INFO----> 
    setShowPay(!showPay)
   
  }

  const onChange = (dates) => { // <--- SET STATES WITH CALENDAR DATES----> 
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const totalDays = (startDate, endDate) => {  // <--- FIND DATES BETWEEN START DATE AND END DATE----> 
    let actualDay = startDate;
    let totalDateArray = [];
    while (actualDay.isSameOrBefore(endDate)) {
      totalDateArray.push(moment(actualDay).format("MM/DD/YYYY"));
      actualDay.add(1, "days");
    }
    return totalDateArray;
  };

  useEffect(()=>{                         // <--- SET DAYS AND PRICE----> 
      let firstDay = moment.utc(startDate);
      let lastDay = moment.utc(endDate);
      let daysToCalc = totalDays(firstDay,lastDay)
      let priceXDay = product.amount
      setPrice(Math.round((priceXDay*daysToCalc.length)*100)/100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[endDate])

  useEffect(()=>{    // <--- REMOVE ERROR----> 
    
    setTimeout(()=>{
      setShowCalendar(true)
      setError(false); 
      setStartDate(null); 
      setEndDate(null); 
      setShowPay(false);       
    }, 2000)
    
  },[error])

  const handleSubmit = (e) => {    // <--- COMPARE SELECTED DATES WITH RESERVED DATES AND MANAGE ERROR---->
    e.preventDefault();
    setShowCalendar(false)

    let firstDay = moment.utc(startDate);
    let lastDay = moment.utc(endDate);

    const finalDateArray = totalDays(firstDay, lastDay);
    let newFinalArr = finalDateArray.filter ((element) => product.bookDates.includes ( element ))


    
    if (newFinalArr.length > 0) {
      setError(!error);
      
    } else if(!finalDateArray[1]){
      setError(!error)
    }
    else {
      setFinalDateArray(finalDateArray)
      };
      
    }

  let printArr = []

  printArr = product.bookDates.map((date)=>{ return new Date(date)})

  return (
    <div>

    {showCalendar &&
    <form onSubmit={handleSubmit}>
      <Calendar
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDays={printArr}
      />
      <button className="book-button" type="submit" onClick={payInfoHandler}><h1>Book for {price}€</h1></button>

     
    </form>}
      {error  && <div className="err-dates"><h3>Please select available dates</h3></div>}
    {!showCalendar && !error &&
    <div>
      <h2>Selected days are the following:</h2>
      <p>{moment(startDate).format('DD/MM/YY')}-{moment(endDate).format('DD/MM/YY')}</p>
      <h2>The price is:</h2>
      <p>{price}€</p>
      
    </div>}


    {!error && !showCalendar &&
    <div>
        <button onClick={(e)=>{
          e.preventDefault()
          setShowCalendar(true)
          setStartDate(null)
          setEndDate(null)
          }}>Select another dates</button>
        <PaypalPop price ={price}  product={product} startDate={startDate} endDate={endDate} excludedDays={finalDateArray}/>
    </div>
    }
    
    </div>
  );
}

export default BookForm;
