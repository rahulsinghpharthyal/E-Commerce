import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { toast } from "react-toastify";

const PasswordRecover = () => {
  const { id } = useParams();
  const [value, setValue] = useState({ password: "", confirmPassword: "" });
  const [data, setData] = useState({ isLoading: false });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setData({ isLoading: true });
      if (value?.password !== value?.confirmPassword)
        return alert("Password and confirm password must be same");
      const { data, status } = await axiosPrivate.post(
        `/api/recover/reset-password/${id}`,
        { password: value?.password }
      );
      if (data.success) {
        setData({ isLoading: false });
        toast.success(data.message);
        navigate("/auth/login");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md h-[32rem] p-8 space-y-6 shadow-sm rounded-md">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 ">
        <div className="mt-28">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Enter New Password
          </label>
          <input
            type="password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="password"
            id="password"
            value={value?.password}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="mt-28">
          <label
            htmlFor="confirm password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="confirm Password"
            id="confirm password"
            value={value?.confirmPassword}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            required
          />
        </div>
        {!data?.isLoading ? (
          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Reset Password
          </button>
        ) : (
          <div className="w-full py-2 px-4 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500">
            Please Wait...
          </div>
        )}
      </form>
    </div>
  );
};

export default PasswordRecover;
