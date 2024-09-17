import React from "react";
import { MdOutlineStarRate } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const ShoppingProductDetails = ({ open, setOpen, productDetails, handleAddToCart }) => {
  console.log("this is product from shoping detual", productDetails);

  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setOpen(!open)} // Click outside to close
    >
      <div
        className="bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] overflow-auto shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        {/* Left Side - Product Image */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Right Side - Product Details */}
        <div>
          {/* Title and Description */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              {productDetails?.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-6">
            <p
              className={`text-2xl md:text-3xl font-bold text-gray-800 ${
                productDetails?.salePrice > 0 ? "line-through text-red-400" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                ₹{productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Ratings Section */}
          <div className="flex items-center gap-2 mb-6">
            <MdOutlineStarRate className="text-yellow-500" />
            <MdOutlineStarRate className="text-yellow-500" />
            <MdOutlineStarRate className="text-yellow-500" />
            <MdOutlineStarRate className="text-yellow-500" />
            <MdOutlineStarRate className="text-yellow-500 fill-yellow-200" />
            <span className="text-gray-500">(4.5)</span>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-6">
            {productDetails?.totalStock === 0 ? (
              <button className="w-full bg-gray-300 text-white py-2 rounded-lg opacity-60 cursor-not-allowed">
                Out of Stock
              </button>
            ) : (
              <button 
              onClick={()=>handleAddToCart(productDetails?._id)}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white py-2 rounded-lg transition duration-300 ease-in-out">
                Add to Cart
              </button>
            )}
          </div>

          <hr className="my-6" />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {/* Example Review */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xl text-gray-600 border">
                  {user.userName[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{user.userName}</h3>
                  <div className="flex flex-row gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-gray-500">
                    Great product! Highly recommend.
                  </p>
                </div>
              </div>

              <h3 className="text-gray-500">No more reviews.</h3>
            </div>

            {/* Write a Review */}
            <div className="mt-8">
              <label className="text-lg font-bold text-gray-800">
                Write a review
              </label>
              <input
                name="reviewMsg"
                placeholder="Write a review..."
                className="border border-gray-300 rounded-lg p-2 w-full mt-2"
              />
              <button className="bg-slate-900 text-white py-2 rounded-lg mt-4 w-full hover:bg-slate-950 transition duration-300 ease-in-out">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductDetails;
