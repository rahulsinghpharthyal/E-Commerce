import {configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminProductsSlice from './slices/adminProductSlice';
import shopProductSlice from './slices/shopProductSlice';
import cartSlice from './slices/cartSlice';
import addressSlice from './slices/addressSlice';
import shoppingOrderSlice from './slices/orderSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductSlice,
        shopcart: cartSlice,
        userAddress: addressSlice,
        shoppingOrderSlice: shoppingOrderSlice
    }
});

export default store;