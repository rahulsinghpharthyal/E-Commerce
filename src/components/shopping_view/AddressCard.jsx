import React from 'react'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) => {
  return (
    <div
    onClick={
      setCurrentSelectedAddress
        ? () => setCurrentSelectedAddress(addressInfo)
        : null
    }
    className={`cursor-pointer rounded-lg shadow-lg p-4 transition-all duration-300 ${
      selectedId?._id === addressInfo?._id
        ? "border-4 border-red-900"
        : "border border-black"
    }`}
  >
    <div className="grid gap-4">
      <p className="text-gray-700 font-medium">Address: {addressInfo?.address}</p>
      <p className="text-gray-700 font-medium">City: {addressInfo?.city}</p>
      <p className="text-gray-700 font-medium">Pincode: {addressInfo?.pincode}</p>
      <p className="text-gray-700 font-medium">Phone: {addressInfo?.phone}</p>
      <p className="text-gray-700 font-medium">Notes: {addressInfo?.notes}</p>
    </div>
  
    <div className="p-3 flex justify-between mt-4">
      <button
        onClick={() => handleEditAddress(addressInfo)}
        className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-9500"
      >
        Edit
      </button>
      <button
        onClick={() => handleDeleteAddress(addressInfo._id)}
        className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-950"
      >
        Delete
      </button>
    </div>
  </div>
  
  )
}

export default AddressCard;