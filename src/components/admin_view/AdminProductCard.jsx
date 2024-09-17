import React, { Children } from "react";

const AdminProductCard = ({
  product,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  setFormData,
  handleDelete,
}) => {
  console.log("product is ", product);
  return (
    <>
      <div className="flex  gap-7">
        {product &&
          product?.map((product) => (
            <div
              className="w-full h-fit max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden"
              key={product._id}
            >
              <div className="relative">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 mt-2">
                  {product?.title}
                </h2>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`${
                      product?.salePrice > 0 ? "line-through" : ""
                    } text-lg font-semibold text-gray-800`}
                  >
                    ₹{product?.price}
                  </span>
                  {product?.salePrice > 0 && (
                    <span className="text-lg font-bold text-red-600">
                      ₹{product?.salePrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setOpenCreateProductsDialog(true);
                    setCurrentEditedId(product?._id);
                    setFormData(product);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product?._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminProductCard;
