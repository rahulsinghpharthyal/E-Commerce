import React, { useEffect, useState } from "react";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "../../components/shopping_view/CartItemsContent";
import ShoppingAddress from "../../components/shopping_view/ShoppingAddress";
import { createNewOrderAction } from "../../store/actions/orderAction";
import { toast } from "react-toastify";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopcart);
  const { user } = useSelector((state) => state.auth);
  const { approvalUrl, orderId } = useSelector((state) => state.shoppingOrderSlice);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = async () => {
    if (!currentSelectedAddress) {
      toast.warn("Please Select One Address");
    }
    const orderData = {
      userId: user._id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        addressInfo: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      paymentMethod: "paypal",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log(orderData);
    try {
      const { payload } = await dispatch(createNewOrderAction(orderData));
      console.log("paylaod", payload);
      if (payload.success) {
        setIsPaymentStart(!isPaymentStart);
      } else {
        setIsPaymentStart(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("tis is orderId url", orderId);
  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShoppingAddress
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={handleInitiatePaypalPayment}
              className="w-full bg-slate-900 hover:bg-slate-950 h-10 text-white rounded-lg"
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
