import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Chart from "chart.js/auto";
import { users_created_per_day } from "../utils/Constants";

function CustomerGraph() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(users_created_per_day);
      setUserData(response.data);
      renderChart(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const renderChart = (data) => {
    const labels = data.map((entry) => entry.date);
    const counts = data.map((entry) => entry.count);

    const ctx = document.getElementById("userGraph");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Users Created Per Day",
            data: counts,
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="w-auto p-3 mx-auto bg-slate-50 shadow-md rounded-lg  my-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Users Created Per Day
      </h2>
      <canvas id="userGraph" width="400" height="200"></canvas>
    </div>
  );
}

export default CustomerGraph;
