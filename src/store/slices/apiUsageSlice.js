import { createSlice } from "@reduxjs/toolkit";
import { getAllusageApi } from "../actions/apiUseageAction";

const initialState = {
    isLoading: false,
    usageStats: [],
    error: null,
}

const apiUsageSlice = createSlice({
    name: 'apiUsage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllusageApi.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllusageApi.fulfilled, (state,action)=>{
            console.log('this is from apiUsage', action);
            state.isLoading = false;
            state.usageStats = action.payload;
        })
        .addCase(getAllusageApi.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default apiUsageSlice.reducer;