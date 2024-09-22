import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PaypalReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const { cartItems } = useSelector((state) => state.shopcart);
  // const { user } = useSelector((state) => state.auth);
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  // console.log('this is paymentID', paymentId);
  // console.log('this is payerId', payerId);
  // console.log('this is cartItems', cartItems);
  // console.log('this is user', user);

  // const totalCartAmount =
  //   cartItems && cartItems.items && cartItems.items.length > 0
  //     ? cartItems.items.reduce(
  //         (sum, currentItem) =>
  //           sum +
  //           (currentItem?.salePrice > 0
  //             ? currentItem?.salePrice
  //             : currentItem?.price) *
  //             currentItem?.quantity,
  //         0
  //       )
  //     : 0;

  useEffect(() => {
    if (payerId && paymentId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      const capturePaymentAction = async () => {
        try {
          const { data } = await axiosPrivate.post(
            "/api/shop/order/capture-payment",
            { paymentId, payerId, orderId}
          );
          console.log("this is very", data);
          if (data.success) {
            sessionStorage.removeItem("currentOrderId");
            setIsLoading(false);
            toast.success(data.message);
            navigate("/shop/payment-success");
          }
          return data;
        } catch (err) {
          return console.log(err);
        }
      };
      capturePaymentAction();
    }
  }, [paymentId, payerId]);
  return (
    <div className="bg-white  rounded-lg p-6 max-w-sm mx-auto">
      <div className="pb-4 mb-4">
        {isLoading ? (
          <h2 className="text-xl font-semibold text-gray-800">
            Processing Payment...Please wait!
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">
            Payemnt Succefull.......
          </h2>
        )}
      </div>
    </div>
  );
};

export default PaypalReturn;
