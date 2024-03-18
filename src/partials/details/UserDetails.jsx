import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../utils/axios";
import { getUserDetail_byid } from "../../utils/Constants"; // Assuming you have a constant for the API endpoint
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const token = useSelector((state) => state.token);

  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${getUserDetail_byid}${id}`).then((response) => {
      setData(response.data);
    });
  }, [id, setData]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeat_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      company: "",
    },
    validate: (values) => {
      const errors = {};

      // Example validation for email
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      // Add validations for other fields

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
      } catch (error) {
        // Handle error
        toast.error("Failed to update user details", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        console.error("Error updating user details:", error);
      }
      setSubmitting(false);
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="w-full xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight uppercase font-sans text-black">
            User Details
          </h2>

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="text-base font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.email}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="text-base font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="first_name"
                  x
                  name="first_name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-red-500">{formik.errors.first_name}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="text-base font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-red-500">{formik.errors.last_name}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="text-base font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.phone_number}
                />
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <div className="text-red-500">
                    {formik.errors.phone_number}
                  </div>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-800"
            >
              {formik.isSubmitting ? "Submitting..." : "Update Details"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UserDetails;
