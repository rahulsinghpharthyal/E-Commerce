import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../customAxios/privateAxios";

const TrackRoutes = () => {
  const [logs, setLogs] = useState([]);

  // Fetch logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosPrivate.get("/api/admin/logs");
        console.log(response.data);
        setLogs(response.data.Data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Admin Dashboard: Backend Logs
    </h1>
    <div className="overflow-x-auto w-[1100px]">
      <table className="max-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs md:text-sm leading-normal">
            <th className="py-3 px-2 md:px-6 text-left">Method</th>
            <th className="py-3 px-2 md:px-6 text-left">URL</th>
            <th className="py-3 px-2 md:px-6 text-left">IP Address</th>
            <th className="py-3 px-2 md:px-6 text-left">Date</th>
            <th className="py-3 px-2 md:px-6 text-left">Response Time (ms)</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-xs md:text-sm font-light">
          {logs.map((log) => (
            <tr
              key={log._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-2 px-2 md:py-3 md:px-6 text-left whitespace-nowrap">
                <span className="font-medium text-blue-600">{log.method}</span>
              </td>
              <td className="py-2 px-2 md:py-3 md:px-6 text-left whitespace-nowrap">
                {log.url}
              </td>
              <td className="py-2 px-2 md:py-3 md:px-6 text-left">{log.ip}</td>
              <td className="py-2 px-2 md:py-3 md:px-6 text-left">
                {new Date(log.date).toLocaleString()}
              </td>
              <td className="py-2 px-2 md:py-3 md:px-6 text-left">
                {log.responseTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default TrackRoutes;
