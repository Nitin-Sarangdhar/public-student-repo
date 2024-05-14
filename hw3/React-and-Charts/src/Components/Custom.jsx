import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './Custom.css'; // Import the CSS file for styling

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Custom = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('https://cs464p564-frontend-api.vercel.app/api/countries')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const countryNames = response.data.map(country => country.name);
          const gdpPerCapita = response.data.map(country => country.gdp_billions * 1000000/ country.population);

          setChartData({
            labels: countryNames,
            datasets: [
              {
                label: 'GDP per Capita',
                data: gdpPerCapita,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>GDP per Capita of Countries</h2>
      {chartData.labels ? (
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'GDP per Capita (Thousands)'
                  }
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Custom;
