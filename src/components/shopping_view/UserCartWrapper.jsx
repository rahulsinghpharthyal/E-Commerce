import React from "react";
import CartItemsContent from "./CartItemsContent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserCartWrapper = ({ openCart, setOpenCart, cartItems }) => {
  console.log("this is cartItems", cartItems);
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={() => setOpenCart(!openCart)}
    >
      <div
        className="bg-white rounded-lg p-6 w-full sm:max-w-md space-y-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems && cartItems?.items?.length > 0 ? (
            cartItems?.items?.map((item, index) => (
              <CartItemsContent cartItem={item} key={index} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Cart Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalCartAmount}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => {
            if (cartItems?.items?.length <= 0) {
              toast.warn("Please Add Items in your cart");
            } else {
              navigate("/shop/checkout");
              setOpenCart(false);
            }
          }}
          // disabled={cartItems.items.length <= 0}
          className="w-full bg-slate-900 hover:bg-slate-950 text-white py-3 rounded-lg font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default UserCartWrapper;
