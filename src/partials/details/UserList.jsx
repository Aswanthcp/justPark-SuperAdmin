import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getusers, Userblock, Userunblock } from "../../utils/Constants";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);

  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });

  const handleError = (error) => {
    console.error("Error fetching users:", error);
    // Handle error here, e.g., show error message to the user
  };

  const getUsersList = () => {
    axios
      .get(`${getusers}?page=${page}`, {
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
    getUsersList();
  }, [page, token]);

  const blockUser = (id) => {
    axios
      .patch(
        `${Userblock}${id}`, // Updated URL for blocking user
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getUsersList(); // Refresh user list after blocking
        Swal.fire("Success", "User blocked successfully", "success");
      })
      .catch(handleError);
  };

  const unblockUser = (id) => {
    axios
      .patch(
        `${Userunblock}${id}`, // Updated URL for unblocking user
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getUsersList(); // Refresh user list after unblocking
        Swal.fire("Success", "User unblocked successfully", "success");
      })
      .catch(handleError);
  };

  return (
    <div>
      <div className="bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <span className=" text-center text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              User Details
            </span>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pagination.results.map((row, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
              >
                <td className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white">
                  <Link to={`${row.id}`}>{row.username}</Link>
                </td>
                <td className="px-6 py-4">{row.first_name}</td>
                <td className="px-6 py-4">{row.last_name}</td>
                <td className="px-6 py-4">{row.phone_number}</td>
                <td className="px-4 py-4 text-right">
                  {row.is_active == false ? (
                    <button
                      onClick={() => {
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
                            unblockUser(row.id);
                          }
                        });
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      UNBLOCK
                    </button>
                  ) : (
                    // Render Block button if row.is_active is false
                    <button
                      onClick={() => {
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
                            blockUser(row.id);
                          }
                        });
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      BLOCK
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
