import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

const Chart = ({ chartType, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: chartType,
        renderTo: chartRef.current,
      },
      title: {
        text: 'Analysis of Disasters',
      },
      xAxis: {
        title: {
          text: 'Year',
        },
        categories: ['2016', '2017', '2018', '2019', '2020'], // Modify this array as needed
      },
      yAxis: {
        title: {
          text: 'No. of Disasters', // Change the y-axis label here
        },
      },
      series: [
        {
          data: data,
        },
      ],
    };

    // Create the Highcharts chart
    const chart = new Highcharts.Chart(options);

    // Clean up when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [chartType, data]);

  return <div ref={chartRef}></div>;
};

Chart.propTypes = {
  chartType: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Chart;
