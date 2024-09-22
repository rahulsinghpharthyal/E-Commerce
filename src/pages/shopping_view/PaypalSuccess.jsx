import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { toast } from "react-toastify";

const PaypalSuccess = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopcart);
  const [invoice, setInvoice] = useState(null);

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

  useEffect(() => {
    const generateInvoice = async () => {
      try {
        const { data } = await axiosPrivate.post("/api/shop/order/invoice", {
          cartItems: cartItems?.items,
          userEmail: user?.email,
          totalCartAmount,
        });
        if (data.success) {
          setInvoice(data?.Data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    generateInvoice();
  }, [cartItems?.items, user?.email]);

  console.log("this is invoice", invoice);

  const sendInvoiceEmail = async () => {
    try {
      const response = await axiosPrivate.post("/api/shop/order/send-invoice-email", {
        userEmail: user?.email,
        invoice,
      });
      console.log('this is response', response);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to send the invoice.");
      }
    } catch (err) {
      console.log("Error sending invoice:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Invoice Details
      </h2>
      {invoice ? (
        <>
          {/* Merchant Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700">Merchant Info</h3>
            <p className="text-gray-600">
              {invoice.merchant_info?.business_name}
            </p>
            <p className="text-gray-600">{invoice.merchant_info?.email}</p>
            <p className="text-gray-600">
              {invoice.merchant_info?.address.line1},{" "}
              {invoice.merchant_info?.address.city},{" "}
              {invoice.merchant_info?.address.state},{" "}
              {invoice.merchant_info?.address.postal_code}
            </p>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Item Name</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Unit Price</th>
                  <th className="py-3 px-6 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {invoice.items?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left">{item.name}</td>
                    <td className="py-3 px-6 text-center">{item.quantity}</td>
                    <td className="py-3 px-6 text-center">
                      {item.unit_price.currency} {item.unit_price.value}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {item.unit_price.currency}{" "}
                      {(item.unit_price.value * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <p className="text-gray-700 font-semibold">
                Total Amount: {invoice.total_amount.currency}{" "}
                {invoice.total_amount.value}
              </p>
            </div>
          </div>

          {/* Invoice Note */}
          <div className="mt-4">
            <p className="text-gray-600 italic">{invoice.note}</p>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-2">
            <p className="text-gray-600">{invoice.terms}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-950"
              onClick={sendInvoiceEmail}
            >
              Send Invoice to Email
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Loading invoice...</p>
      )}
    </div>
  );
};

export default PaypalSuccess;
