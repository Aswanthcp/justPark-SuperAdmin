import React, { useState } from "react";
<<<<<<< HEAD
=======

>>>>>>> 078cd476d2a3d1cd2c13f5f7c92e35d7873e3487
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Banner from "../partials/Banner";
<<<<<<< HEAD
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import ReservationChart from "../charts/ReservationChart";
import CustomerGraph from "../charts/CustomerGraph";
=======
>>>>>>> 078cd476d2a3d1cd2c13f5f7c92e35d7873e3487

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
<<<<<<< HEAD
    <div className="flex h-screen ">
=======
    <div className="flex h-screen overflow-hidden">
>>>>>>> 078cd476d2a3d1cd2c13f5f7c92e35d7873e3487
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
<<<<<<< HEAD
      <div className="relative flex flex-col flex-1  bg-gray-100">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <DashboardCard01 type="users" />
              <DashboardCard01 type="places" />
              <DashboardCard01 type="slots" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-white  shadow-md rounded-lg">
                <div className="p-6">
                  <ReservationChart />
                </div>
              </div>

              <div className="bg-white  shadow-md rounded-lg">
                <div className="p-6">
                  <CustomerGraph />
                </div>
              </div>
            </div>
=======
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            dashboard
>>>>>>> 078cd476d2a3d1cd2c13f5f7c92e35d7873e3487
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
