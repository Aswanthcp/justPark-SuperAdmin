import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { reservations_per_month } from "../utils/Constants";

function ReservationChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      const response = await axios.get(reservations_per_month);
      setChartData(response.data);
      renderChart(response.data);
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
  };

  const renderChart = (data) => {
    const ctx = document.getElementById("reservationChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((entry) => entry.month),
        datasets: [
          {
            label: "Reservations Per Month",
            data: data.map((entry) => entry.count),
            backgroundColor: "rgba(59, 130, 246, 0.5)", // Tailwind blue-500
            borderColor: "rgba(59, 130, 246, 1)", // Tailwind blue-500
            borderWidth: 2,
            borderRadius: 5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              borderColor: "rgba(0, 0, 0, 0)", // Remove grid lines
            },
            ticks: {
              color: "rgba(17, 24, 39, 0.5)", // Tailwind cool-gray-500
              font: {
                weight: "bold",
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(17, 24, 39, 0.5)", // Tailwind cool-gray-500
              font: {
                weight: "bold",
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgba(17, 24, 39, 0.5)", // Tailwind cool-gray-500
              font: {
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: 1,
            titleColor: "rgba(17, 24, 39, 0.8)", // Tailwind cool-gray-700
            bodyColor: "rgba(17, 24, 39, 0.8)", // Tailwind cool-gray-700
          },
        },
      },
    });
  };

  return (
    
    <div className="w-auto p-3 mx-auto bg-slate-50 shadow-md rounded-lg  my-8">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Reservations Per Month Chart</h2>

    <canvas id="reservationChart" width="400" height="200"></canvas>
</div>
  );
}

export default ReservationChart;
