import React, { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAction,
  deleteAddressAction,
  getAddressAction,
  updateAddressAction,
} from "../../store/actions/addressAction";
import { toast } from "react-toastify";

const ShoppingAddress = ({setCurrentSelectedAddress, selectedId}) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const [currenentEditedId, setCurrentEditedId] = useState(null);
  console.log("this is form data", formData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.userAddress);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(addressList?.length >= 3  && currenentEditedId === null){
        toast.warn('You can add max 3 address')
        return;
      }
      console.log("currenentEditedId is", currenentEditedId);
      console.log('ths is form data', formData);
      if (currenentEditedId !== null) {
        const { payload } = await dispatch(
          updateAddressAction({
            userId: user._id,
            addressId: currenentEditedId,
            formData,
          })
        );
        if (payload.success) {
          toast.success(payload.message);
          dispatch(getAddressAction(user?._id));
          setCurrentEditedId(null);
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          });
        }
      } else {
        const { payload } = await dispatch(
          addAddressAction({ formData, userId: user?._id })
        );
        console.log(payload);
        if (payload?.success) {
          toast.success(payload.message);
          dispatch(getAddressAction(user?._id));
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { payload } = await dispatch(
        deleteAddressAction({ userId: user._id, addressId: addressId })
      );
      console.log("this is payload from delete", payload);
      if (payload?.success) {
        toast.success(payload?.message);
        dispatch(getAddressAction(user._id))
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleEditAddress = (getCurrentEditedId) => {
    console.log("this is getCurrtenEditedid", getCurrentEditedId);
    setCurrentEditedId(getCurrentEditedId?._id);
    setFormData({
      address: getCurrentEditedId.address || "",
      city: getCurrentEditedId.city || "",
      pincode: getCurrentEditedId.pincode || "",
      phone: getCurrentEditedId.phone || "",
      notes: getCurrentEditedId.notes || "",
    });
  };

  useEffect(() => {
    dispatch(getAddressAction(user._id));
  }, [dispatch, user?._id]);

  console.log("this is addressList", addressList);

  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              setCurrentEditedId={setCurrentEditedId}
              setFormData={setFormData}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <p className="text-gray-500">No addresses available</p>
        )}
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          {addressFormControls.map((control, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor={control.name}
              >
                {control.label}
              </label>
              {control.componentType === "input" ? (
                <input
                  type={control.type}
                  name={control.name}
                  placeholder={control.placeholder}
                  value={formData[control.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <textarea
                  name={control.name}
                  placeholder={control.placeholder}
                  value={formData[control.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={
              !Object.values(formData).every((field) => field.trim() !== "")
            }
            className={`w-full p-3 font-bold rounded-md transition ${
              Object.values(formData).every((field) => field.trim() !== "")
                ? "bg-slate-900 text-white hover:bg-slate-950"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currenentEditedId !== null ? "Edit Address" : "Add New Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShoppingAddress;
