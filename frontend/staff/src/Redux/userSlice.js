import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        getAllUsers: {
            allUsers:null,
            isFetching: false,
            error: false, 
        },
        againPassword: {
            success: null,
            isFetching: false,
            error: false,
        },
    },
    reducers:{
        getUserStart: (state) => {
            state.getAllUsers.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.getAllUsers.isFetching = false;
            state.getAllUsers.allUsers = action.payload;
        },
        getUserFailed: (state) => {
            state.getAllUsers.isFetching = false;
            state.getAllUsers.error = true;
        },
        setPassStart: (state) => {
            state.againPassword.isFetching = true;
        },
        setPassSuccess: (state,action) => {
            state.againPassword.success = action.payload;
            state.againPassword.isFetching = false;
        },
        setPassFailed: (state) => {
            state.againPassword.error = true
        }

    }
})

export const {
    getUserStart,
    getUserSuccess,
    getUserFailed,

    setPassStart,
    setPassSuccess,
    setPassFailed

} = userSlice.actions;

export default userSlice.reducer;