import React from "react";
import { Link } from "react-router-dom";

function DashboardCard01({ type }) {
  const cardData = {
    users: {
      title: "USERS",
      isMoney: false,
      link: "/user",
      icon: (
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      total: 100, // Example total number of users
    },
    places: {
      title: "PLACES",
      isMoney: false,
      link: "/place",
      icon: (
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
      total: 10, // Example total number of places
    },
    slots: {
      title: "SLOTS",
      isMoney: false,
      link: "/place",
      icon: (
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4v4m0 6v2m-4-3h8"
          />
        </svg>
      ),
      total: 10, // Example total number of slots
    },
  };

  const { title, link, icon, total } = cardData[type] || {};

  return (
    <div className="w-full mx-2 mb-8">
      <div className="bg-slate-200 dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center">
            {icon}
            {title}
          </h2>
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
              Total: {total}
            </div>
            <div className="text-base font-semibold text-blue-500">+50%</div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <Link to={link} className="text-sm text-blue-500 hover:text-blue-700">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
