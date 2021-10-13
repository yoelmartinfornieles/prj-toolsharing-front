import { useState } from "react";
import axios from "axios";
import GoogleMap from "./GoogleMap";

function AdressConverter(props) {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(true)

  let API_URL = process.env.REACT_APP_API_URL;

  const handleStreet = (e) => {
    setStreet(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let searchStreet = street.replace(/\s+/g, "+");
    let searchCity = city.replace(/\s+/g, "+");

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchStreet},+${number},+${postalCode},+${searchCity}&key=AIzaSyCO6vMEzrsXbc43qNmIEzbkTrV7nwhEf_Q`
      )
      .then((response) => {
        setLat(response.data.results[0].geometry.location.lat);
        setLng(response.data.results[0].geometry.location.lng);
        setShowMap(true);
      });
  };

  const handleSubmitCoords = (e) => {
    e.preventDefault();
    let requestBody = {
    location:{ lat: lat, lng: lng },
    address:{
      street: street,
      number: number,
      city: city,
      postalCode: postalCode,
    }
    }

    
    axios
      .put(API_URL + `/user/${props.id}`, requestBody)
      .then((response) => { return ("ok")
      })
      .catch((err) => {
        console.log("Error:", err);
      });

      setShowForm(false)
  };

  return (
    <div>
      {showForm && (
        <div className="new-location-form">
          <form className="new-location-form-text" onSubmit={handleSubmit}>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={street}
              onChange={handleStreet}
            ></input>
            <label>Number:</label>
            <input
              type="text"
              name="street"
              value={number}
              onChange={handleNumber}
            ></input>
            <label>Postal Code:</label>
            <input
              type="text"
              name="street"
              value={postalCode}
              onChange={handlePostalCode}
            ></input>
            <label>City:</label>
            <input
              type="text"
              name="street"
              value={city}
              onChange={handleCity}
            ></input>
            <button type="submit" className="location-button">Check Location</button>
          </form>
          {showMap && (
            <div className="google-map">
              <GoogleMap lat={lat} lng={lng} />
              <form onSubmit={handleSubmitCoords}>
                <button className="location-button">Confirm</button>
              </form>
            </div>
          )}
        </div>
      )}
      {!showForm && (
        <div>
          <h1 className="location-text">
            Allright! you're new location is: {street}, {number}, {postalCode}, {city}.
          </h1>
          <button onClick={props.close} className="location-button">Close</button>
        </div>
      )}
    </div>
  );
}

export default AdressConverter;
