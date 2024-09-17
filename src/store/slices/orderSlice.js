import {createSlice } from '@reduxjs/toolkit';
import { createNewOrderAction } from '../actions/orderAction';


const initialState = {
    isLoading: false,
    orderId: null,
    approvalUrl: null,
    error: null,
}

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createNewOrderAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createNewOrderAction.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.approvalUrl = action.payload.approvalURL,
            state.orderId = action.payload.orderId;
            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
        })
        .addCase(createNewOrderAction.rejected, (state)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

export default shoppingOrderSlice.reducer;