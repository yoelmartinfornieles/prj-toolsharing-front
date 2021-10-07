import {Marker} from 'google-maps-react';
import React from "react";
import GoogleMapReact from 'google-map-react';
import Pointer from '../images/location-pointer.png'


function GoogleMap(props){
    const AnyReactComponent = ({ imgSrc }) => <img className="google-map-pointer" src={imgSrc}  alt="google-pointer"/>;

    
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div className="container-google">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCO6vMEzrsXbc43qNmIEzbkTrV7nwhEf_Q' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      <Marker className="marker" lat={props.lat} lng={props.lng} />
      <AnyReactComponent
          lat={props.lat}
          lng={props.lng}
          imgSrc={Pointer}
        />
      
      </GoogleMapReact>
    </div>
  );
}
 



export default GoogleMap;