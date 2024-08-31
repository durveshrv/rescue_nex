import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeafletMap from '../components/LeafletMap';
import Chart from '../components/Chart';
import '../App.css'; 
import Alertx from '../components/Alertx';
import axios from 'axios';

export default function Dash1() {
  const [chartData, setChartData] = useState([]);
  const [disasterTypes, setDisasterTypes] = useState([]);

  useEffect(() => {
    // Fetch disaster data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/disasters'); // Adjust the URL as needed
        const disasters = response.data;
        console.log(disasters);
        // Extract disaster types and data for the chart
        const types = [...new Set(disasters.map(d => d.Entity))];
        setDisasterTypes(types);
        console.log("Types:", types);
        // Process data for chart
        const filteredData = disasters.map(d => ({ Year: d.Year, Disasters: d.Disasters, Entity: d.Entity }));
        setChartData(filteredData);
      } catch (err) {
        console.error('Error fetching disaster data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Alertx type='success' msg="Logged in"/>
      <div className='container w-50 h-50'>
        <LeafletMap />
      </div>
      <div className='mt-5 w-75 mx-auto'>
        <Chart data={chartData} disasterTypes={disasterTypes} />
      </div>
      <Footer />
    </>
  );
}
