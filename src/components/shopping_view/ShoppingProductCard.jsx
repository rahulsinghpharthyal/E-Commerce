import React from "react";

const ShoppingProductCard = ({ products, handleGetProductDetails, handleAddToCart }) => {
  console.log('this is prodcut form home', products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-72 p-6">
      {products && products.length > 0 ? (
        products?.map((product) => (
          <div
            key={product._id}
            className="min-w-64 mx-auto bg-white shadow-lg rounded-lg"
            onClick={()=>handleGetProductDetails(product._id)}
          >
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              {/* Conditional Badge */}
              {product?.totalStock === 0 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Out Of Stock
                </span>
              )}
              {product?.totalStock > 0 && product?.totalStock < 10 && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Only {product.totalStock} left
                </span>
              )}
              {product?.salePrice > 0 && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Sale
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {product?.title}
              </h2>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="font-medium">{product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}</span>
                <span className="font-medium">{product?.brand.charAt(0).toUpperCase() + product?.brand.slice(1)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                {/* Price Section */}
                <span
                  className={`${
                    product?.salePrice > 0
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  } text-lg font-semibold`}
                >
                  ₹{product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-lg font-semibold text-green-600">
                    ₹{product?.salePrice}
                  </span>
                )}
              </div>
            </div>

            {/* Footer with Add to Cart Button */}
            <div className="px-4 pb-4 flex justify-end items-baseline">
              {product?.totalStock === 0 ? (
                <button className="w-full bg-gray-300 text-gray-500 py-2 rounded-md cursor-not-allowed opacity-60">
                  Out Of Stock
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id)}}
                  className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>
          No Product in this Ecommerce we Are working on that that for visiting
        </p>
      )}
    </div>
  );
};

export default ShoppingProductCard;
