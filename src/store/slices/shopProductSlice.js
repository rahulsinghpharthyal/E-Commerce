import { createSlice } from "@reduxjs/toolkit";
import { getShopProductByIdAction, shopProductAction } from "../actions/shopProductAction";


const initialState = {
    isLoading: false,
    productList: [],
    productDetials: [],
    error: null
};

const shopProductSlice = createSlice({
    name: "shopProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // get all fiter product and all product 
        .addCase(shopProductAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(shopProductAction.fulfilled, (state, action) => {
            console.log('this is from shopProductAction', action);
            state.isLoading = false,
            state.productList = action.payload
        })
        .addCase(shopProductAction.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
        // get product detalis by id
        .addCase(getShopProductByIdAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getShopProductByIdAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetials = action.payload;
        })
        .addCase(getShopProductByIdAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export default shopProductSlice.reducer;