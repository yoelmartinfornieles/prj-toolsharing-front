import { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log("dlat:", lat);
    console.log("dlng:", lng);
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let searchStreet = street.replace(/\s+/g, "+");
    let searchCity = city.replace(/\s+/g, "+");

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchStreet},+${number},+${postalCode},+${searchCity}&key=AIzaSyCO6vMEzrsXbc43qNmIEzbkTrV7nwhEf_Q`
      )
      .then((response) => {
        console.log(response.data.results[0].geometry.location);

        setLat(response.data.results[0].geometry.location.lat);
        setLng(response.data.results[0].geometry.location.lng);
        setShowMap(true);
      });
  };

  const handleSubmitCoords = (e) => {
    console.log("holaaaaaaa");
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

    
    console.log("object to submit:", requestBody);

    axios
      .put(API_URL + `/user/${props.id}`, requestBody)
      .then((response) => {
        console.log("this is your location:", response);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

      setShowForm(false)
  };

  return (
    <div>
      {showForm && (
        <div clssName="new-location-form">
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
            <button type="submit" class="location-button">Check Location</button>
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
