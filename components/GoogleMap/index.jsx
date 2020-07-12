import React from 'react';
import GoogleMapReact from 'google-map-react';

import { MapMarker } from 'components/MapMarker';

import config from './mapConfig';

function getMapOptions() {
  return config;
}

export function GoogleMap({ mapMarkers = [] }) {
  return (
    // Important! Always set the container height explicitly
    <div className="google-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_BOOTSTRAP_URL }}
        defaultCenter={{lat: 40.635,lng: -73.94}}
        defaultZoom={13}
        options={getMapOptions}
      >
       {mapMarkers.map((item) => (
          <MapMarker
            key={item.key}
            text={item.text}
            lat={ item.coordinates.lat}
            lng={ item.coordinates.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
