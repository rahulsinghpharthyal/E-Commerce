import React, { useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";

const AdminOrder = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const toggleDetailsDialog = () => {
    setOpenDetailsDialog(!openDetailsDialog);
  };

  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white w-[1100px]">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          All Orders
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm lg:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-3 text-left font-semibold">Order ID</th>
              <th className="px-4 py-3 text-left font-semibold">Order Date</th>
              <th className="px-4 py-3 text-left font-semibold">
                Order Status
              </th>
              <th className="px-4 py-3 text-left font-semibold">Order Price</th>
              <th className="px-4 py-3">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this hardcoded order with dynamic data */}
            <tr className="border-t">
              <td className="px-4 py-2">123</td>
              <td className="px-4 py-2">13353gf</td>
              <td className="px-4 py-2">
                <span className="inline-block py-1 px-3 rounded text-white bg-black">
                  Pending
                </span>
              </td>
              <td className="px-4 py-2">$150</td>
              <td className="px-4 py-2 text-right">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={toggleDetailsDialog}
                >
                  View Details
                </button>

                {/* Modal rendering */}
                {openDetailsDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-3xl p-6 relative overflow-auto max-h-[90vh]">
                      <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setOpenDetailsDialog(false)} // Assuming a function to close the dialog
                      >
                        ✕
                      </button>
                      <AdminOrderDetails />
                    </div>
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No orders available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
