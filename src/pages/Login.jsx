import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "../utils/axios";
import { loginPost } from "../utils/Constants";
import { useFormik } from "formik";
import { setLogin } from "../Redux/store";

const validate = (values) => {
  const errors = {};

  //password
  if (!values.password) {
    errors.password = toast.error("password is required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("wrong password");
  }

  return errors;
};
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(loginPost, values);
        const { data } = response;

        dispatch(setLogin({ admin: data.data, token: data.admin_jwt }));
        navigate("/");

        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if ((status >= 400 && status <= 500) || status === 401) {
            setError(data.message);
          } else {
            setError("Network Error");
          }
        } else {
          setError("An error occurred while processing your request.");
        }
        console.error("Error during login:", error);
      }
    },
  });
  const [error, setError] = useState("");

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            SUPER ADMIN LOGIN
          </h2>

          <form method="POST" className="mt-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  UserName{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="UserName"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>{error && <div className="text-red-500">{error}</div>}</div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;
