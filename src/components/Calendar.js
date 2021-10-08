import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Calendar = (props) => {
let today = new Date()
    return (
      <DatePicker
        minDate={today}
        selected={props.startDate}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        dateFormat="dd/MM/yyyy"  
        excludeDates={props.excludeDays}
        selectsRange
        inline
      />
    );
  };

  export default Calendar;