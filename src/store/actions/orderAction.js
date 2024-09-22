import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

const createNewOrderAction = createAsyncThunk('/order/createNewOrder', async(orderData, {rejectWithValue})=>{
    console.log('tis is orderData', orderData);
    try{
    const {data} = await axiosPrivate.post('/api/shop/order/create', {orderData});
    console.log(" data is from order Actioin", data);
    return data;
    }catch(err){
        return rejectWithValue(err)
    }
})
// const capturePaymentAction  = createAsyncThunk('/order/capturePayment', async({paymentId, payerId, orderId})=>{
//     console.log(paymentId, payerId, orderId);
//     try{
//     const { data } = await axiosPrivate.post('/api/shop/order/capture-payment', {paymentId, payerId, orderId});
//     return data;
//     }catch(err){
//         return console.log(err);
//     }
// })


export {
    createNewOrderAction
}