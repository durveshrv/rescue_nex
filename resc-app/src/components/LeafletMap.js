import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import '../App.css'; // Import a CSS file for additional styling

const LeafletMap = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const customIcon = new Icon({
    iconUrl: "../location-pin.png",
    iconSize: [38, 38]
  });

  const markers = [
    {
      geocode: [18.53, 73.86],
      popup: "Hello I am popup1",
      category: "category1",
    },
    {
      geocode: [18.52, 73.856],
      popup: "Hello I am popup2",
      category: "category2",
    },
    {
      geocode: [18.532, 73.8566],
      popup: "Hello I am popup3",
      category: "category1",
    }
  ];

  const filteredMarkers = filterCategory === 'all'
    ? markers
    : markers.filter(marker => marker.category === filterCategory);

  return (
    <div className="leaflet-map-container" style={{backgroundColor:"#99FFFF"}}>
      <div className="leaflet-map-filters">
        <label>
          Filter by Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </label>
      </div>

      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {filteredMarkers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
