import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";

const Chart = ({ data, disasterTypes }) => {
  const chartRef = useRef(null);
  const [selectedType, setSelectedType] = useState(disasterTypes[0]);
  const [chartType, setChartType] = useState("line");
  const [startYear, setStartYear] = useState(2016);
  const [endYear, setEndYear] = useState(2023);
  const [yearRange, setYearRange] = useState([2016, 2023]);

  useEffect(() => {
    if (!chartRef.current) return;

    const filteredData = data
      .filter(
        (d) =>
          d.Entity === selectedType &&
          yearRange.length === 2 &&
          d.Year >= yearRange[0] &&
          d.Year <= yearRange[1]
      )
      .map((d) => ({ Year: d.Year, Disasters: d.Disasters }));

    const options = {
      chart: {
        type: chartType,
        renderTo: chartRef.current,
      },
      title: {
        text: "Analysis of Disasters",
      },
      xAxis: {
        title: {
          text: "Year",
        },
        categories: filteredData.map((d) => d.Year),
      },
      yAxis: {
        title: {
          text: "No. of Disasters",
        },
      },
      series: [
        {
          name: selectedType,
          data: filteredData.map((d) => d.Disasters),
        },
      ],
    };

    // Create the Highcharts chart
    const chart = Highcharts.chart(options);

    // Clean up when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [chartType, data, selectedType, yearRange]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleYearRangeChange = () => {
    if (startYear > endYear) {
      alert("Start Year cannot be greater than End Year");
      return;
    }
    setYearRange([startYear, endYear]);
  };

  return (
    <div>
      <div>
        <label htmlFor="typeFilter">Disaster Type:</label>
        <select
          id="typeFilter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {disasterTypes.map((Entity) => (
            <option key={Entity} value={Entity}>
              {Entity}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Select Chart Type:
          <select value={chartType} onChange={handleChartTypeChange}>
            <option value="line">Line Chart</option>
            <option value="column">Column Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </label>
      </div>
      <div>
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
      <div ref={chartRef}></div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Entity: PropTypes.string.isRequired,
      Year: PropTypes.number.isRequired,
      Disasters: PropTypes.number.isRequired,
    })
  ).isRequired,
  disasterTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Chart;
