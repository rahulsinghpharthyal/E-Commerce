import {createSlice} from '@reduxjs/toolkit';
import { addNewProductAction, deleteProductAction, getAllProductsAction, updateProductAction } from '../actions/productAction';

const initialState = {
    isLoading: false,
    productList: [],
    error: null
}

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // getAllProducts
        .addCase(getAllProductsAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllProductsAction.fulfilled, (state, action) => {
            state.isLoading = false,
            console.log(action.payload.Data);
            state.productList = action.payload.Data
        })
        .addCase(getAllProductsAction.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload
        })

        // addNewProduct
        .addCase(addNewProductAction.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(addNewProductAction.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.productList = action.payload
        })
        .addCase(addNewProductAction.rejected, (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        })
        // // updateProduct
        // .addCase(updateProductAction.pending, (state)=> {
        //     state.isLoading = true
        // })
        // .addCase(updateProductAction, (state, action)=> {
        //     state.isLoading = false,
        //     state.productList = action.payload
        // })
        // .addCase(updateProductAction, (state, action)=>{
        //     state.isLoading = false,
        //     state.productList = action.payload
        // })
        // // deleteProduct
        // .addCase(deleteProductAction.pending, (state)=> {
        //     state.isLoading = true
        // })
        // .addCase(deleteProductAction, (state, action)=> {
        //     state.isLoading = false,
        //     state.productList = action.payload
        // })
        // .addCase(deleteProductAction, (state, action)=>{
        //     state.isLoading = false,
        //     state.productList = action.payload
        // })
    }

})


export default adminProductSlice.reducer;