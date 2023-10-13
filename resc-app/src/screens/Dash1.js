import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeafletMap from '../components/LeafletMap';
import Chart from '../components/Chart';
import '../App.css'; 
import Alertx from '../components/Alertx';

export default function Dash1() {
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState([1, 2, 3, 4, 5]);
  const [startYear, setStartYear] = useState(2016);
  const [endYear, setEndYear] = useState(2023);
  const [yearRange, setYearRange] = useState([]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // const handleDataChange = () => {
  //   // Change the chart data as needed
  //   const newData = [5, 4, 3, 2, 1];
  //   setChartData(newData);
  // };

  const handleYearRangeChange = () => {
    const newYearRange = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    setYearRange(newYearRange);
  };

  return (
    <>
      <Navbar />
      <Alertx type='success' msg="Logged in"/>
      <div className='container w-50 h-50'>
        <LeafletMap />
      </div>
      <div className='mt-5 w-75 mx-auto'>
        <div className='chart-controls'>
          <div className='select-chart'>
            <label>
              Select Chart Type:
              <select
                value={chartType}
                onChange={handleChartTypeChange}
                className='chart-type-select'
              >
                <option value="line">Line Chart</option>
                <option value="column">Column Chart</option>
                <option value="bar">Bar Chart</option>
                {/* Add more chart types as needed */}
              </select>
            </label>
          </div>
          {/* <button onClick={handleDataChange} className='change-data-button'>
            Change Data
          </button> */}
          <div className='year-range-input'>
            <label>
              Year Range (Start - End):
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                placeholder="Start Year"
              />
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                placeholder="End Year"
              />
              <button onClick={handleYearRangeChange}>Apply</button>
            </label>
          </div>
        </div>
        <Chart chartType={chartType} data={chartData} yearRange={yearRange} />
      </div>
      <Footer />
    </>
  );
}
