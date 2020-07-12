import React from 'react';
import useSwr from 'swr';
import GoogleMapReact from 'google-map-react';

import { MapMarker } from 'components/MapMarker';

import config from './mapConfig';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getMapOptions() {
  return config;
}

export function GoogleMap() {
  const { data, error } = useSwr('/api/testing-sites', fetcher, { initialData: [] });

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_BOOTSTRAP_URL }}
        defaultCenter={{lat: 40.635,lng: -73.94}}
        defaultZoom={13}
        options={getMapOptions}
      >
       {data.map((item) => (
          <MapMarker
            key={`${item.site_name}+${item.coordinates.lat}+${item.coordinates.lng}`}
            text={item.site_name}
            lat={ item.coordinates.lat}
            lng={ item.coordinates.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
