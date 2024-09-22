// src/components/ApiUsageStats.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllusageApi } from "../../store/actions/apiUseageAction";

const ApiUsageStats = () => {
  const dispatch = useDispatch();
  const { usageStats } = useSelector((state) => state.apiUsage);

  useEffect(() => {
    // Fetch the aggregated data from the backend
    dispatch(getAllusageApi());
  }, [dispatch]);

  console.log("this is ussagesstates", usageStats);

  return (
    <div className="max-w-full overflow-auto">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        API Usage Statistics
      </h2>
      <div className="max-h-[400px] w-[1100px] overflow-y-auto overflow-x-auto">
        <table className=" bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-[150px]">Date</th>
              <th className="py-3 px-6 text-left w-[100px]">Endpoint</th>
              <th className="py-3 px-6 text-center w-[150px]">Request Count</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {usageStats.map((stat, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {`${stat._id.day}-${stat._id.month}-${stat._id.year}`}
                </td>
                <td className="py-3 px-6 text-left">{stat._id.endpoint}</td>
                <td className="py-3 px-6 text-center">{stat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiUsageStats;
