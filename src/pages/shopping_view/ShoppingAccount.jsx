import React, { useState } from "react";
import accountImg from '../../assets/account.jpg';
import ShoppingOrder from "../../components/shopping_view/ShoppingOrder";
import ShoppingAddress from "../../components/shopping_view/ShoppingAddress";

const ShoppingAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");
  return (
    <div className="flex flex-col">
      {/* Image Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="Account"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b pb-4 mb-4">
            <button
              onClick={() => setActiveTab("orders")}
              className={`${
                activeTab === "orders"
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "text-gray-600"
              } pb-2 transition-colors duration-300`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`${
                activeTab === "address"
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "text-gray-600"
              } pb-2 transition-colors duration-300`}
            >
              Address
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "orders" && (
              <div>
                <ShoppingOrder/>
              </div>
           )}
            {activeTab === "address" && (
              <div>
                <ShoppingAddress/>
              </div>
           )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
