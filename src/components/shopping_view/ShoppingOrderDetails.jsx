import React from "react";

const ShoppingOrderDetails = () => {
  return (
    <div className="sm:max-w-[600px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid gap-6">
        {/* Order Information Section */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <p className="font-light">12345</p>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <p className="font-light">12.7.324</p>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <p className="font-light">$100</p>
          </div>
          {/* <div className="flex mt-2 items-center justify-between">
        <p className="font-medium">Payment Method</p>
        <p className="font-light">{orderDetails?.paymentMethod}</p>
      </div> */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <p className="font-light">Pending</p>
          </div>
          {/* <div className="flex mt-2 items-center justify-between">
        <p className="font-medium">Order Status</p>
        <span
          className={`inline-block py-1 px-3 rounded text-white ${
            orderDetails?.orderStatus === "confirmed"
              ? "bg-green-500"
              : orderDetails?.orderStatus === "rejected"
              ? "bg-red-600"
              : "bg-black"
          }`}
        >
          {orderDetails?.orderStatus}
        </span>
      </div> */}
        </div>

        {/* Separator */}
        <hr className="border-t my-4" />

        {/* Order Details Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {/* {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? ( */}
              {/* orderDetails?.cartItems.map((item) => ( */}
              <li className="flex items-center justify-between">
                <span>Title: </span>
                <span>Quantity:</span>
                <span>Price:</span>
              </li>
              {/* )) */}
              {/* ) : (
            <li>No items in the order</li>
          )} */}
            </ul>
          </div>
        </div>

        {/* Shipping Info Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-500">
              <span>rahul</span>
              <span>address</span>
              <span>city</span>
              <span>pincode</span>
              <span>phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingOrderDetails;
