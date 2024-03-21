import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Unbook_Slot, book_Slot, get_parkingSlot, update_slot_price } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SlotList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const [tempPrice, setTempPrice] = useState({});
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
      .get(`${get_parkingSlot}?page=${page}`, {
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

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const bookSlot = (id) => {
    axios
      .patch(
        `${book_Slot}${id}`, // Updated URL for blocking user
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("booked");
        getPlacesList(); // Refresh user list after blocking
        Swal.fire("Success", "User blocked successfully", "success");
      })
      .catch(handleError);
  };

  const unbookSlot = (id) => {
    axios
      .patch(
        `${Unbook_Slot}${id}`, // Updated URL for unblocking user
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("unbooked");
        getPlacesList(); // Refresh user list after unblocking
        Swal.fire("Success", "User unblocked successfully", "success");
      })
      .catch(handleError);
  };
  const handlePriceChange = (event, id) => {
    const { value } = event.target;
    setTempPrice({ ...tempPrice, [id]: value }); // Update temporary price state
  };

  const updatePrice = (id) => {
    const newPrice = tempPrice[id]; // Get the temporary price value
    axios
      .patch(
        `${update_slot_price}${id}`, // URL for updating slot price
        { price: newPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getPlacesList(); // Refresh slot list after updating price
        Swal.fire("Success", "Price updated successfully", "success");
      })
      .catch(handleError);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <span className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Slots Details</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Place
                  </th>
                  <th scope="col" className="px-4 py-3">
                    slot Number
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagination.results.map((row, index) => (
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {row?.place?.name}
                    </th>

                    <td className="px-4 py-3"> {row.slot_number}</td>

                    <td className="px-4 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.is_booked}
                          onChange={() => {
                            if (row.is_booked == false) {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, unblock it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  unbookSlot(row.id);
                                }
                              });
                            } else {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, block it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  bookSlot(row.id);
                                }
                              });
                            }
                          }}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {row.is_booked ? "Unbook" : "Book"}
                        </span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <div class="relative flex items-center justify-content-center ">
                        <input
                          class="text-base placeholder-gray-400 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent py-2 px-3 w-auto"
                          type="number"
                          value={tempPrice[row.id] || row.price}
                          onChange={(event) => handlePriceChange(event, row.id)}
                          placeholder="Enter price"
                        />
                        <button
                          class="absolute right-0 h-full px-4 font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:bg-indigo-800 -ml-px"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, update it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                updatePrice(row.id);
                              }
                            });
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center m-5">
          <div className="inline-flex mt-2 xs:mt-0">
            {pagination.hasPrevPage && (
              <button
                onClick={prePage}
                className="flex m-1 items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
            )}
            {pagination.hasNextPage && (
              <button
                onClick={nextPage}
                className="flex items-center m-1 justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlotList;
