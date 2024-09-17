import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

// add the address
const addAddressAction = createAsyncThunk('/addresses/addNewAddress', async({formData, userId},{rejectWithValue})=>{
    try{
    console.log('this is form data', formData);
        const {data} = await axiosPrivate.post('/api/shop/address/add', {formData, userId});
        console.log('this data for creating address', data);
        return data;
    }catch(err){
        return rejectWithValue(err.response.data || err.message)
    }
}) 

// get allAddress: -
const getAddressAction = createAsyncThunk('/addresses/getallddress', async(userId,{rejectWithValue})=>{
    try{
        console.log('thisis userId', userId);
        const { data } = await axiosPrivate.get(`/api/shop/address/get/${userId}`);
        console.log('this data for creating address', data);
        return data.Data;
    }catch(err){
        return rejectWithValue(err.response.data || err.message)
    }
})  

// update address:-
const updateAddressAction = createAsyncThunk('/addresses/updateAddress', async({userId, addressId, formData},{rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.put(`/api/shop/address/update/${userId}/${addressId}`, {formData});
        console.log('this data for creating address', data);
        return data;
    }catch(err){
        return rejectWithValue(err.response.data || err.message)
    }
})  

// delete address:-

const deleteAddressAction = createAsyncThunk('/addresses/deleteAddress', async({userId, addressId}, {rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.delete(`/api/shop/address/delete/${userId}/${addressId}`);
        console.log('this data for creating address', data);
        return data;
    }catch(err){
        return rejectWithValue(err.response.data || err.message)
    }
})  

export {
    addAddressAction,
    getAddressAction,
    updateAddressAction,
    deleteAddressAction
}