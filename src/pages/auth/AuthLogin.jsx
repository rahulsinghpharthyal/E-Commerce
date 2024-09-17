import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../../store/actions/authAction";

const initialState = {
  email: '',
  password: ''
};

const AuthLogin = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const { payload } = await dispatch(loginAction(formData));
      console.log(payload);
      if(payload?.success){
        toast.success(`${payload?.Data?.userName} you are successfully logedIn.👍`)
      }else{
        toast.error(payload.message)
      }
    }catch(err){
      console.log("Error from register page", err.message);
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md h-[32rem] p-8 space-y-6 shadow-sm rounded-md">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Login to Your Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
            className="mt-1 w-full mb-14 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Forgot your password?{" "}
        <Link className="font-medium text-blue-600 hover:underline" to="#">
          Reset it here
        </Link>.
      </p>
    </div>
  );
};

export default AuthLogin;
