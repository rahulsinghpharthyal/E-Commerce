import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction, deleteToCartAction, getItemsToCartAction, updateToCartAction } from "../actions/cartAction";

const initialState ={
    isLoading: false,
    cartItems: [],
    error: false,
}

const cartSlice = createSlice({
    name: 'shopcart',
    initialState,
    reduces: {},
    extraReducers: (builder)=>{
        builder
        // for adding the cart
        .addCase(addToCartAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addToCartAction.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        .addCase(addToCartAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // get the items
        .addCase(getItemsToCartAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getItemsToCartAction.fulfilled, (state, action)=>{
            console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        .addCase(getItemsToCartAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // updatethe cart
        .addCase(updateToCartAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateToCartAction.fulfilled, (state, action)=>{
            console.log('action from cart', action);
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        .addCase(updateToCartAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // delete the item from cart
        .addCase(deleteToCartAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteToCartAction.fulfilled, (state, action)=>{
            console.log('action from cart', action);
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        .addCase(deleteToCartAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default cartSlice.reducer; 