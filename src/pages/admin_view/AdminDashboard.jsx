import React from 'react';
import { FaChartBar, FaUsers, FaShoppingCart, FaCog } from 'react-icons/fa';


const AdminDashboard = () => {
 
  return (
    <div className="flex h-screen bg-gray-100 w-full">
   
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Sales */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-600">$12,345</p>
          </div>

          {/* Card 2: Orders */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-600">234</p>
          </div>

          {/* Card 3: Users */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
            <p className="text-2xl font-bold text-gray-600">1,234</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
          <div className="relative">
            <canvas id="salesChart" />
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
