import React, { useState } from 'react'
import ShoppingOrderDetails from './ShoppingOrderDetails';

const ShoppingOrder = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white">
  <div className="mb-5">
    <h2 className="text-xl font-semibold mb-4">Order History</h2>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left font-medium text-gray-700">Order ID</th>
          <th className="px-4 py-2 text-left font-medium text-gray-700">Order Date</th>
          <th className="px-4 py-2 text-left font-medium text-gray-700">Order Status</th>
          <th className="px-4 py-2 text-left font-medium text-gray-700">Order Price</th>
          <th className="px-4 py-2">
            <span className="sr-only">Details</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* {orderList && orderList.length > 0 ? (
          orderList.map((orderItem) => ( */}
            <tr className="border-t">
              <td className="px-4 py-2">234</td>
              <td className="px-4 py-2">datae</td>
              <td className="px-4 py-2">
                <span
                  // className={`inline-block py-1 px-3 rounded text-white ${
                  //   orderItem?.orderStatus === "confirmed"
                  //     ? "bg-green-500"
                  //     : orderItem?.orderStatus === "rejected"
                  //     ? "bg-red-600"
                  //     : "bg-black"
                  // }`}
                >
                  Inprogress
                  {/* {orderItem?.orderStatus} */}
                </span>
              </td>
              <td className="px-4 py-2">$1000</td>
              <td className="px-4 py-2 text-right">
                <div>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>setOpenDetailsDialog(!openDetailsDialog)}
                  >
                    View Details
                  </button>
                  {openDetailsDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-3xl p-6 relative overflow-auto max-h-[90vh]">
                      <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setOpenDetailsDialog(false)} // Assuming a function to close the dialog
                      >
                        ✕
                      </button>
                      <ShoppingOrderDetails />
                    </div>
                  </div>
                )}
                </div>
              </td>
            </tr>
          {/* )) */}
        {/* ) : ( */}
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-500">
              No orders available
            </td>
          </tr>
        {/* )} */}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default ShoppingOrder;