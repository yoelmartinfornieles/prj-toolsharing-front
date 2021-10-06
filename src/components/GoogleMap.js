import { Map, GoogleApiWrapper, Marker, LoadScript } from 'google-maps-react';
import React from "react";
import GoogleMapReact from 'google-map-react';
import Pointer from '../images/location-pointer.png'


function GoogleMap(props){
    const AnyReactComponent = ({ imgSrc }) => <img className="google-map-pointer" src={imgSrc} />;

    
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
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
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