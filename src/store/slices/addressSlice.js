import { createSlice }from '@reduxjs/toolkit';
import { addAddressAction, deleteAddressAction, getAddressAction, updateAddressAction } from '../actions/addressAction';


const initialState = {
    isLoading: false,
    addressList: [],
    error: null,
}
const addressSlice = createSlice({
    name: 'userAddress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // add the address:-
        .addCase(addAddressAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addAddressAction.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.addressList = action.payload;
        })
        .addCase(addAddressAction.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all address;
        .addCase(getAddressAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAddressAction.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.addressList = action.payload;
        })
        .addCase(getAddressAction.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // update address:-
        .addCase(updateAddressAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateAddressAction.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.addressList = action.payload;
        })
        .addCase(updateAddressAction.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // delete address:-
        .addCase(deleteAddressAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteAddressAction.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.addressList = action.payload;
        })
        .addCase(deleteAddressAction.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })



    }
})

export default addressSlice.reducer;