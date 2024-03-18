import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

import Banner from "../../partials/Banner";
import PlaceDetails from "../../partials/PlacePartials/PlaceDetails";

const PlaceDetailsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4">
            <PlaceDetails />
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
