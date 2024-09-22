import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerAction } from "../../store/actions/authAction";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { meta, payload } = await dispatch(registerAction(formData));
      console.log(payload)
      if (payload?.success) {
        // alert(`${meta?.arg?.userName} Your ${payload.message}`)
        toast.success(`${meta?.arg?.userName} Your ${payload.message}`);
        navigate("/auth/login");
      } else {
        toast.error(`Registration failed: ${payload?.message}`);
      }
    } catch (err) {
      console.log("Error from register page", err.message);
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md h-[32rem] p-8 space-y-6 shadow-sm rounded-md">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Create New Account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>

      {/* <p className="text-center text-sm text-gray-500">
        By signing up, you agree to our{" "}
        <Link className="font-medium text-blue-600 hover:underline" to="#">
          Terms
        </Link>{" "}
        and{" "}
        <Link className="font-medium text-blue-600 hover:underline" to="#">
          Privacy Policy
        </Link>
        .
      </p> */}
    </div>
  );
};

export default AuthRegister;
