import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

export const addToCartAction = createAsyncThunk("/cart/addtocart", async ({userId, productId, quantity}, { rejectWithValue }) => {
    try{
        const {data} = await axiosPrivate.post('/api/shop/cart/add', {userId, productId, quantity});
        return data;
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const getItemsToCartAction = createAsyncThunk("/cart/getCartItems", async (userId, {rejectWithValue}) => {
    console.log('this is userId', userId);
    try{
        const { data } = await axiosPrivate.get(`/api/shop/cart/get/${userId}`);

        console.log('this is data to add to cart', data.Data);
        return data.Data;
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteToCartAction = createAsyncThunk("/cart/deleteCartItems", async ({userId, productId}, {rejectWithValue}) => {
    console.log('this is userzid', userId);
    console.log('this is productId', productId);
    try{
        const {data} = await axiosPrivate.delete(`/api/shop/cart/${userId}/${productId}`, {userId, productId});
        console.log('this is data to add to cart', data);
        return data.Data;
    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const updateToCartAction = createAsyncThunk("/cart/updatetocart", async ({userId, productId, quantity}, {rejectWithValue}) => {
    console.log('this is productId', productId);
    try{
        const {data} = await axiosPrivate.put('/api/shop/cart/update-cart', {userId, productId, quantity});
        console.log('this is data to add to cart', data);
        return data.Data;
    }catch(err){
        return rejectWithValue(err.response?.data || err.message)
    }
});


