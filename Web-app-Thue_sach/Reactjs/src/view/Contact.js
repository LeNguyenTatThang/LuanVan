import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(
    withGoogleMap(() => (
        <GoogleMap
            defaultZoom={15}  // Thay đổi mức độ zoom theo nhu cầu của bạn
            defaultCenter={{ lat: 10.7769, lng: 106.7009 }}  // Vị trí ban đầu: Ho Chi Minh City
        >
            <Marker position={{ lat: 10.7769, lng: 106.7009 }} />  {/* Đánh dấu vị trí trên bản đồ */}
        </GoogleMap>
    ))
);

export default function Contact() {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBkvzk2jfcdQr5K1q4xGDlFBR2MfkeVyPQ&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

