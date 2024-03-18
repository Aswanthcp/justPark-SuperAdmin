import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../utils/axios";
import { getPlaceDetail_byid } from "../../utils/Constants"; // Assuming you have a constant for the API endpoint
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PlaceDetails = () => {
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`${getPlaceDetail_byid}${id}`).then((response) => {
      setData(response.data);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: data.name || "", // Provide default values to prevent undefined errors
      address: data.address || "",
      total_slots: data.total_slots || "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.address) {
        errors.address = "Address is required";
      }

      if (!values.total_slots) {
        errors.total_slots = "Total slots is required";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
    await axios.put(`${getPlaceDetail_byid}${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Place details updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to update place details", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        console.error("Error updating place details:", error);
      }
      setSubmitting(false);
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="w-full xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight uppercase font-sans text-black">
            Page Details
          </h2>

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                Place Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Place Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-base font-medium text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500">{formik.errors.address}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="total_slots"
                className="text-base font-medium text-gray-900"
              >
                Total Slots
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="total_slots"
                  name="total_slots"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Total Slots"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.total_slots}
                />
                {formik.touched.total_slots && formik.errors.total_slots ? (
                  <div className="text-red-500">
                    {formik.errors.total_slots}
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

export default PlaceDetails;
