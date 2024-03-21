import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getPlaces } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PlaceList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);

  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPage: 1,
    results: [],
  });

  const handleError = (error) => {
    console.error("Error fetching Places:", error);
    // Handle error here, e.g., show error message to the user
  };

  const getPlacesList = () => {
    axios
      .get(`${getPlaces}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPagination(response.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    getPlacesList();
  }, [page, token]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-dark bg-gray-100 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                <Link to='/place/add/'>Add Places</Link>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Place name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-4 py-3">
                    total slots
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagination.results.map((row, index) => (
                  <tr className="border-b dark:border-gray-700" id={row.id}>
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link to={`${row.id}`}>{row.name}</Link>
                    </th>
                    <td className="px-4 py-3">{row.address}</td>
                    <td className="px-4 py-3">{row.total_slots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceList;
