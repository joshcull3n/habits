import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { useContext, useRef, useEffect, useState } from 'react';
import { Context } from '../Context';

const Graph = () => {
  const { habits, startDate, endDate, graphFontColor, setGraphFontColor, graphLineColor, setGraphLineColor, graphBgColor, setGraphBgColor, graphStepSize, setGraphStepSize } = useContext(Context);
  const graphRef = useRef(null);
  const graphData = generateGraphData(habits, startDate, endDate);

  useEffect(() => {
    setGraphFontColor(getComputedStyle(graphRef.current).getPropertyValue('--ticks-color').trim()); // should return rgb(227, 188, 175)
    setGraphLineColor(getComputedStyle(graphRef.current).getPropertyValue('--line-color').trim());
    setGraphBgColor(getComputedStyle(graphRef.current).getPropertyValue('--bg-color').trim());
    setGraphStepSize(getComputedStyle(graphRef.current).getPropertyValue('--step-size').trim());
  }, [graphFontColor]);

  function generateDateKey(date) {
    // the dateKeys are parsed like this because toISOString() converts 
    // the dates to UTC, which often pushes/pulls the date by 1 day
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }
  
  function generateGraphData(habits, startDate, endDate) {
    // labels
    const labels = [];
    const dates = [];
  
    const currDate = new Date(startDate);
    while (currDate <= endDate) {
      labels.push(currDate.getDate());
      dates.push(new Date(currDate));
      currDate.setDate(currDate.getDate() + 1);
    }
  
    const dateCounts = {};
    dates.forEach(date => {
      const dateKey = generateDateKey(date);
      dateCounts[dateKey] = 0;
    })
  
    habits.forEach(habit => {
      habit.doneDates.forEach(doneDate => {
        let dateKey = generateDateKey(doneDate);
        if (dateCounts[dateKey] !== undefined)
          dateCounts[dateKey]++;
      });
    });
  
    const datePercs = {}
    dates.forEach(date => {
      const dateKey = generateDateKey(date);
      const perc = (dateCounts[dateKey]/habits.length);
      datePercs[dateKey] = perc;
    });
  
    const dataPoints = Object.keys(datePercs).map(key => datePercs[key]);
    
    const data = {
      labels,
      datasets: [
        {
          data: dataPoints,
          borderColor: graphLineColor,
          fill: true,
          backgroundColor: graphBgColor,
          tension: 0.3,
          pointRadius: 0
        }
      ]
    };
  
    return data;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Hide the legend (labels)
      },
    },
    scales: {
      y: {
        min: 0,
        max:1,
        grid: {
          color: 'rgba(33, 33, 33, 0.1)',  // Faint grid lines for x-axis
          drawBorder: true,
        },
        ticks: {
          stepSize: graphStepSize,
          color: graphFontColor,
          font: {
            family: 'Work Sans',
          },
          // Display values as percentages
          callback: function(value) {
            return `${(value * 100).toFixed(0)}%`; // Convert decimal to percentage
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(33, 33, 33, 0.1)',  // Faint grid lines for x-axis
          drawBorder: true,
        },
        ticks: {
          color: graphFontColor,
          font: {
            family: "Work Sans",
          }
        }
      }
    }
  };

  return ( 
    <div className='graph' ref={graphRef}>
      <Line data={graphData} options={options} />
    </div>
  )
}

export default Graph;