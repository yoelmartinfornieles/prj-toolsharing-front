import CalendarBook from '../components/CalendarBookDetails'

function BookingPage(props){
    console.log ("props.match.params: ", props.match.params)
    let productId = props.match.params.id
    console.log ("productId: ", productId)


    return(
        <div>
            <h1>Book a tool</h1>
            <CalendarBook/>
        </div>
    )
}

export default BookingPage