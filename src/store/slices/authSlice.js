import {createSlice} from '@reduxjs/toolkit'
import { checkAuthAction, loginAction, logoutAction, registerAction } from '../actions/authAction';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action)=> {
        }
    },
    extraReducers: (builder)=>{
        builder
        // for register user
        .addCase(registerAction.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerAction.fulfilled, (state)=> {
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        .addCase(registerAction.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload
        })

        // for login user
        .addCase(loginAction.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginAction.fulfilled, (state, action)=> {
            console.log('this is action', action.payload)
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.Data : null;
            state.isAuthenticated = action.payload.success ? action.payload.success : false;
        })
        .addCase(loginAction.rejected, (state, action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload
        })

        // check-authenticate user
        .addCase(checkAuthAction.pending, (state) => {
            state.isLoading = false;
        })
        .addCase(checkAuthAction.fulfilled, (state, action)=> {
            console.log(action);
            state.isLoading = false;
            state.isAuthenticated = action?.payload?.success;
            state.user = action?.payload?.success ? action?.payload?.Data : null;
        })
        .addCase(checkAuthAction.rejected, (state, action)=> {
            state.isLoading = false;
        })

        // for logout user
        .addCase(logoutAction.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer;