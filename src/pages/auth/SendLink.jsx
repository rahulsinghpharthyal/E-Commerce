import React, { useState } from "react";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { toast } from "react-toastify";

const SendLink = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({ isLoading: false });

  const onSubmit = async (e) => {
    e.preventDefault();
    setData({ isLoading: true });
    try {
      const { data, status } = await axiosPrivate.post(
        "/api/recover/send-link",
        { email }
      );
      console.log(data);
      if (data.success === true) {
        setData((prev) => ({ isLoading: false }));
        toast.success(data.message);
      }
    } catch (err) {
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        {!data?.isLoading ? (
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Get Recovery Link
          </button>
        ) : (
          <div className="flex justify-center w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            please wait...
          </div>
        )}
      </form>
    </div>
  );
};

export default SendLink;
