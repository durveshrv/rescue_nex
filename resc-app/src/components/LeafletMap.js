import React, { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import '../App.css'; // Import a CSS file for additional styling

const LeafletMap = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [markers, setMarkers] = useState([]);
  const customIcon = new Icon({
    iconUrl: "../location-pin.png",
    iconSize: [38, 38]
  });

  useEffect(() => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getallusers');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const users = await response.json();
        const userMarkers = [];
        
        for (const user of users) {
          const address = encodeURIComponent(user.address);
          try {
            await sleep(1000); // Wait for 1 second before sending the next request
            const geocodeResponse = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=66b25921da502782073136bza1c624b`);
            
            if (geocodeResponse.status === 429) {
              console.error('Rate limit exceeded. Please wait before retrying.');
              userMarkers.push({ ...user, geocode: null });
              continue; // Skip this user and move to the next one
            }
            
            if (!geocodeResponse.ok) throw new Error('Geocode API response was not ok');
            
            const contentType = geocodeResponse.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
              const text = await geocodeResponse.text();
              console.error('Geocode API response is not JSON:', text);
              throw new Error('Response is not JSON');
            }
            
            const geocodeData = await geocodeResponse.json();
            const bestResult = geocodeData[0] || null;
            userMarkers.push(bestResult ? {
              ...user,
              geocode: [parseFloat(bestResult.lat), parseFloat(bestResult.lon)],
            } : {
              ...user,
              geocode: null,
            });
          } catch (error) {
            console.error('Error fetching geocode for address:', user.address, error);
            userMarkers.push({ ...user, geocode: null }); // Handle individual geocode errors
          }
        }
    
        setMarkers(userMarkers.filter(user => user.geocode));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
       
    fetchUserData();
  }, []);

  const filteredMarkers = filterCategory === 'all'
    ? markers
    : markers.filter(marker => marker.category === filterCategory);

  return (
    <div className="leaflet-map-container" style={{ backgroundColor: "#99FFFF" }}>
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
              <Popup>{marker.name}</Popup> {/* Display user's name in the popup */}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
