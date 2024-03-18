import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  get_reservations_list,
  update_reservation,
  update_reservation_status,
} from "../../utils/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReservationPartials = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);

  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPage: 1,
    results: [],
  });
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(); // Adjust options for more specific formatting
  };

  const handleError = (error) => {
    console.error("Error fetching Places:", error);
    // Handle error here, e.g., show error message to the user
  };

  const getReservaionList = () => {
    axios
      .get(`${get_reservations_list}?page=${page}`, {
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

  const handleStatusChange = (reservationId, newStatus) => {
    axios
      .put(
        `${update_reservation_status}${reservationId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Assuming you want to update the list of reservations after a status change
        getReservaionList();
      })
      .catch((error) => {
        console.error("Error updating reservation status:", error);
        // Handle error here, e.g., show error message to the user
      });
  };

  useEffect(() => {
    getReservaionList();
  }, [page, token]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <span className=" text-center text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                Reservations Details
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    user
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Slot Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    time reserved
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Hours Reserved
                  </th>
                  
                  <th scope="col" className="px-4 py-3">
                    car number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    car_details
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
                      <Link to={`${row.id}`}>{row.user.username}</Link>
                    </th>
                    <td className="px-4 py-3">{row.slot.slot_number}</td>
                    <td className="px-4 py-3">{row.slot.price}</td>

                    <td className="px-4 py-3">
                      {formatDate(row.reservation_time)}
                    </td>
                    <td className="px-4 py-3">{row.time_reserved}</td>
                    <td className="px-4 py-3">{row.car_number}</td>
                    <td className="px-4 py-3">{row.car_details}</td>
                    <td className="px-4 py-3">
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          handleStatusChange(row.id, e.target.value)
                        }
                        value={row.status}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="waiting">waiting</option>
                      </select>
                    </td>
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

export default ReservationPartials;
