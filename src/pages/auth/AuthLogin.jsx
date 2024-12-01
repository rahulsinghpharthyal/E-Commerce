import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLoginAction, loginAction } from "../../store/actions/authAction";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const initialState = {
  email: "",
  password: "",
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
    try {
      const { payload } = await dispatch(loginAction(formData));
      console.log(payload);
      if (payload?.success) {
        toast.success(
          `${payload?.Data?.userName} you are successfully logedIn.👍`
        );
      } else {
        toast.error(payload.message);
      }
    } catch (err) {
      console.log("Error from register page", err.message);
      toast.error(`Login failed: ${err.message}`);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log('this is token', token);
    // Dispatch action to handle Google login using the token
    try {
      const { payload } = await dispatch(googleLoginAction({ token }));
      if (payload?.success) {
        toast.success(
          `${payload?.Data?.userName} you are successfully logged in.👍`
        );
      } else {
        toast.error(payload.message);
      }
    } catch (err) {
      toast.error(`Google Login failed: ${err.message}`);
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error("Google Login failed.");
    console.log(error);
  };
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="mx-auto w-full max-w-md h-[32rem] p-8 space-y-6 shadow-sm rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Login to Your Account {clientId}
          </h1>
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
            className="w-full py-2 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            to="/auth/get-recovery-link"
          >
            Reset it here
          </Link>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthLogin;
