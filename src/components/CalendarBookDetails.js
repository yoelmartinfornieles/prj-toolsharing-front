import { useState } from "react";
import {useEffect} from 'react'
import Calendar from "./Calendar.js";
import moment from "moment";

//Test para pruebas

const dataArray = [
  "10/04/2021",
  "10/05/2021",
  "10/06/2021",
  "10/07/2021",
  "10/20/2021",
  "10/21/2021",
  "10/24/2021",
  "10/25/2021",
];

function BookForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);

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
      let priceXDay = 5.6
      setPrice(Math.round((priceXDay*daysToCalc.length)*100)/100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[endDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    let firstDay = moment.utc(startDate);
    let lastDay = moment.utc(endDate);

    const finalDateArray = totalDays(firstDay, lastDay);
   
    const newFinalArr = [];

    finalDateArray.map((result) => {
      if (dataArray.includes(result)) {
        newFinalArr.push(result)
      } return ("ok")
    })

/*     let x = finalDateArray.filter ((element) => dataArray.includes ( element ))
 */    
    console.log('El que volem!!!:',newFinalArr)
/*     console.log('x: ',x) */


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
    <form onSubmit={handleSubmit}>
      <Calendar
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDays={dateArrayToPrint(dataArray)}
      />
      <button type="submit">Book</button>
      <h1>Total: {price}€</h1>
      {error && <h1>Please select available dates</h1>}
      
    </form>
  );
}

export default BookForm;
